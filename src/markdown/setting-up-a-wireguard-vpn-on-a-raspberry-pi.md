---
slug: '/setting-up-a-wireguard-vpn-on-a-raspberry-pi'
date: '2022-06-21'
title: 'Setting up a Wireguard VPN on a Raspberry Pi'
description: ''
---

# Mullvad WireGuard VPN on RaspberryPi with Socks Proxy

This guide demonstrates how to configure a RaspberryPi as a VPN gateway using [Mullvad](https://mullvad.net/) multi-hop [WireGuard](https://www.wireguard.com/) servers and SOCKs Proxy for maximum online anonymity. This article was written over many months of trail and error. So rather than writing what has already been written, I will share the links that helped me achieve my goal, while noting pitfalls I made along the way.

## Concept

Get rid of CAPTCHA

# Why

Put simply, in my experience it's faster than any openVPN configs that I've tried, and doesn't sufffer from the infrequent latency and 'hangs' that can happen with openVPN. It's like your surfing the internet without a VPN.

## Hardware

## Method

## Steps

- [Headless Raspberry Pi Setup](https://hackernoon.com/raspberry-pi-headless-install-462ccabd75d0)
- [Securing your Raspberry Pi](https://www.raspberrypi.org/documentation/configuration/security.md)
- [SSH Key Access](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md#copy-your-public-key-to-your-raspberry-pi)
- [Pi Hole Basic Install](https://docs.pi-hole.net/main/basic-install/)
- [Pi-hole as All-Around DNS Solution](https://docs.pi-hole.net/guides/unbound/)
- [Raspberry Pi WireGuard Prep](https://github.com/adrianmihalko/raspberrypiwireguard/tree/191ca45be600f5a9c263a805455c1c1669ea3627)
- Install SpeedTest CLI: `sudo apt-get install speedtest-cli`
- Install JQ: `sudo apt-get install jq`
- [WireGuard on Linux Terminal](https://mullvad.net/en/help/wireguard-and-mullvad-vpn/)
- Install `netfilter-persistent` to save itables on reboot: `sudo apt install netfilter-persistent iptables-persistent`
- Save iptalbles `sudo bash -c "iptables-save > /etc/iptables/rules.v4"`
- [Setup Routing, NAT and Firewall](https://mgnik.wordpress.com/2019/03/05/raspberry-pi-as-a-vpn-gateway-using-wireguard/)
- [Configure Gateway](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245)
- On Router set Gateway and DNS at `LAN > DHCP Server`. Change Default Gateway, DNS Server 1 to the Raspberry Pi IP address
- Install SpeedTest `sudo apt install speedtest-cli`
- `speedtest`

## Pi Hole firewall rules

```
sudo ufw allow 80/tcp
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
sudo ufw allow 67/tcp
sudo ufw allow 67/udp
```

## Raspberry Pi as WireGuard Pi Hole

- RaspberryPi IP Address: [192.168.1.26](http://192.168.1.26)
- WireGuard config: `mullvad-ch9`
- Mullvad DNS: `193.138.218.74` `10.8.0.1`
- WireGuard proxy: `10.64.0.1`
- OpenVPN proxy: `10.8.0.1`
- Firefox WireGuard proxy: `de10-wg.socks5.mullvad.net`

## When WireGuard Breaks

- Down Tamagotchi Docker containers
- `sudo apt update && sudo apt full-upgrade && sudo apt clean && sudo apt autoremove`
- `sudo rm -rf /etc/wireguard mullvad-wg.sh`
- Delete RaspberryPi WireGuard key in Mullvad account
- `curl -LO https://mullvad.net/media/files/mullvad-wg.sh && chmod +x ./mullvad-wg.sh && ./mullvad-wg.sh` to re-install config files.
- `sudo iptables -S`
- `sudo iptables -D FORWARD -i eth0 -o mullvad-ch9 -j ACCEPT`
- `sudo iptables -D FORWARD -i mullvad-ch9 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT`
- `sudo netfilter-persistent save`
- `sudo iptables -t nat -A POSTROUTING -o mullvad-ch9 -j MASQUERADE`
- `sudo iptables -A FORWARD -i eth0 -o mullvad-ch9 -j ACCEPT`
- `sudo iptables -A FORWARD -i mullvad-ch9 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT`
- `sudo systemctl disable wg-quick@mullvad-ch9.service`
- `sudo systemctl enable wg-quick@mullvad-ch9.service`
- `‌curl https://am.i.mullvad.net/connected`
- `sudo reboot`
- ‌`curl https://am.i.mullvad.net/connected`

## List and delete services

- `sudo systemctl list-units --type service --all`
- `systemctl stop [servicename]`
- `systemctl disable [servicename]`
- `rm /etc/systemd/system/[servicename]`
- `rm /usr/lib/systemd/system/[servicename]`
- `systemctl daemon-reload
- `systemctl reset-failed

## Commands

- `‌curl https://am.i.mullvad.net/connected`
- `sudo apt update && sudo apt full-upgrade && sudo apt clean && sudo apt autoremove`
- `sudo pihole -up`
- `tail -f /var/log/syslog`
- `sudo nano /etc/wireguard/mullvad-xxxx.conf`
- `wg-quick up mullvad-xxxx`

## Update Docker

- ``

## Keys

- Lucas iPhone `Faithful Hermit`
- Rachel Macbook Air `Harmonic Werewolf`
- Rachel iPhone `Snug Seal`
- Raspberry Pi `Psychic Human`
- Lucas Macbook Pro Candis `Unbiased Basset`

Fetched 149 MB in 31s (4747 kB/s)
Reading changelogs... Done
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "UTF-8",
LC_TERMINAL = "iTerm2",
LANG = (unset)
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_ALL to default locale: No such file or directory
Preconfiguring packages ...
