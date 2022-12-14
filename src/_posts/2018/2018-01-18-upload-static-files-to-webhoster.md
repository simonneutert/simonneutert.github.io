---
layout: post
title: Sync Directories with Ruby (no deletion)
categories: [ruby]
tags: [ruby, ssh, sftp]
description: Sync files and directories with sftp
---

In order to automate my Jekyll workflow, I thought about writing a bash script first. But why not use Ruby instead?

Inspiration was found [here](https://www.infoq.com/articles/ruby-file-upload-ssh-intro), where Matthew Bass wrote a nice little article dated 2007. Though its simplicity made it easy to grasp, the script had some flaws. If you used an FTP client for your first upload, and the directories of your project would change or would never be deeper than one level - you are good to go.

Yet my project had nested directories and thanks to progress, the gems wouldn't work quite the same as in the old days of 2007.

__Attention:__ my script isn't perfect, because it is fine for me as it is. One thing, that would enhance it quite a bit, would be parsing a config file, instead of setting the variable in the method itself ;-) feel free!

Contribute to this script on [GitHub](https://github.com/simonneutert/ruby-sftp-sync)

Prepare the gems:

``` bash
# read more: https://github.com/net-ssh
$ gem install net-ssh
$ gem install net-sftp
```

``` ruby
require 'net/ssh'
require 'net/sftp'
require 'find'
require 'io/console'
require 'pry'

# unpolute namespace
require 'net/ssh'
require 'net/sftp'
require 'find'
require 'io/console'
require 'pry'

# unpolute namespace
module Upload2SFTP

  class Server
    attr_reader :host_url, :username, :password
    def initialize(host_url, username, password)
      @host_url = host_url
      @username = username
      @password = password
    end
  end

  class Client
    attr_reader :local_path, :remote_path, :dir_perm, :file_perm
    def initialize(local_path, remote_path, dir_perm, file_perm)
      @local_path = local_path
      @remote_path = remote_path
      @file_perm = file_perm
      @dir_perm = dir_perm
    end
  end

  def self.upload
    host_url = 'yourdomain.com'
    username = 'xyz'
    p "Enter SSH/SFTP Password for user #{username}:"
    password = STDIN.noecho(&:gets).chomp # hidden user input
    server = Server.new(host_url, username, password)

    local_path = './_site'
    remote_path = '/httpdocs/public_html'
    file_perm = 0o644
    dir_perm = 0o755
    client = Client.new(local_path, remote_path, dir_perm, file_perm)

    puts 'Connecting to remote server'
    Net::SSH.start(server.host_url, server.username, password: server.password) do |ssh|
      ssh.sftp.connect do |sftp|
        puts 'Checking for files which need updating'
        Find.find(client.local_path) do |file|
          next if File.stat(file).directory?
          local_file = file.to_s
          remote_file = client.remote_path + local_file.sub(local_path, '')
          remote_dir = File.dirname(remote_file)

          upload_dir(sftp, local_file, remote_dir, client)
          upload_file(sftp, local_file, remote_file, client)
        end
      end
    end
    puts 'Disconnecting from remote server'
    puts 'File transfer complete'
  end

  private

  def self.upload_dir(sftp, local_file, remote_dir, client)
      # directory exists?
      sftp.dir.entries(remote_dir)
    rescue Net::SFTP::StatusException => e
      raise unless (e.code == 2) || (e.code == 4)
      # parse directory structure from file(path)
      dir_structure = File.dirname(local_file.sub(client.local_path, ''))[1..-1].split('/')
      # create directory and subdirectories if they do not exist
      create_directory(sftp, client, dir_structure, remote_dir)
    end
  end


  def self.upload_file(sftp, local_file, remote_file, client)
      # does the file exist?
      rstat = sftp.file.open(remote_file).stat
      if File.stat(local_file).mtime > Time.at(rstat.mtime)
        # update file
        sftp.upload!(local_file, remote_file)
        puts "updating #{remote_file}"
      end
    rescue Net::SFTP::StatusException => e
      raise unless e.code == 2
      # file does not exist -> upload
      sftp.upload!(local_file, remote_file)
      sftp.setstat(remote_file, permissions: client.file_perm)
      puts "creating #{remote_file}"
    end
  end

  def self.create_directory(sftp, client, dir_structure, remote_dir)
    # do subdirectories need to be created?
    if dir_structure.size <= 1
      # no subdirectories
      sftp.mkdir!(remote_dir)
      puts "creating dir: #{remote_dir}"
    else
      # iterate over subdirectories and create them
      dir_structure.each_with_index do |_d, i|
        begin
          # code diamond <3
          subdir = client.remote_path + "/#{dir_structure[0..i].join('/')}"
          sftp.mkdir!(subdir, permissions: client.dir_perm)
          puts "creating dir: #{subdir}"
        rescue Net::SFTP::StatusException => e
          raise unless e.code == 4
          # directory or subdirectory exists
          next
        end
      end
    end
  end
end

Upload2SFTP.upload
```
