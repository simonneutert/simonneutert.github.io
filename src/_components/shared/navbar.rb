class Shared::Navbar < Bridgetown::Component
  def initialize(metadata:, resource:)
    @metadata, @resource = metadata, resource
  end

  def current_page?(path)
    @resource.relative_url == path || @resource.relative_url == "#{path}/"
  end
end
