+++
layout = "post"
title = "Fixing Xbox Controller Bluetooth Issues on Fedora 42 KDE Plasma"
+++

_Finally got my Xbox controller working properly on Linux - here’s how_

## On a NUC 11 Enthusiast ... it works on Arch, too, btw 😅

If you’re running Aurora Linux Fedora 42 with KDE Plasma and struggling with
Xbox controller Bluetooth connectivity issues - the endless connect/disconnect
loops, blinking LEDs that never stabilize, or controllers that pair but don’t
actually work - you’re not alone. **After hours of troubleshooting on my Intel
NUC11 Enthusiast**, I found the solution.

## The Problem

The symptoms were maddening:

- Controller would connect, then disconnect OR appear connected in Linux, but
  blink and is unresponsive
- LED kept blinking instead of staying solid
- Sometimes it showed as “paired” but wasn’t recognized as an input device

Turns out this is a perfect storm of Intel AX210 chipset quirks, BlueZ
configuration changes, and Xbox controller firmware compatibility issues.

## The Solution

Here’s what actually fixed it for me:

### 1. Fix BlueZ Main Configuration

Edit `/etc/bluetooth/main.conf` and add these settings:

```ini
[General]
ControllerMode = dual
Privacy = device
FastConnectable = true
JustWorksRepairing = confirm

[LE]
MinConnectionInterval=7
MaxConnectionInterval=9
ConnectionLatency=0
```

### 2. Critical Input Configuration Change

This was the game-changer. In `/etc/bluetooth/input.conf`, set:

```ini
[General]
UserspaceHID=false
ClassicBondedOnly=false
```

BlueZ changed the `UserspaceHID` default to `true` in March 2024, which breaks
Xbox controllers completely.

### 3. Disable Enhanced Retransmission Mode

Create `/etc/modprobe.d/bluetooth.conf` with:

```
options bluetooth disable_ertm=1
```

ERTM conflicts with Xbox controller Bluetooth implementation and causes most
connection issues.

### 4. Apply Changes and Reboot

```bash
sudo systemctl restart bluetooth
# Or better yet, just reboot to ensure all changes take effect
sudo reboot
```

## The Result

After implementing these changes and rebooting, my Xbox controller finally:

- Connects reliably via Bluetooth
- Maintains stable connection during gaming
- LED stays solid instead of blinking
- Works properly as an input device

You may need to "forget and reconnect" before a session, but this is nothing
that makes me go back to windows.

Finally, gaming on Linux with an Xbox controller works as it should!
