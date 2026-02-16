export interface ConfigItem {
  id: string;
  title: string;
  filename: string;
  description: string;
  category: "shell" | "terminal" | "prompt" | "system" | "editor" | "desktop";
  language: string;
  code: string;
  githubPath: string;
  attribution?: {
    text: string;
    url: string;
  };
  features?: string[];
}

export const configs: ConfigItem[] = [
  {
    id: "fish-config",
    title: "Fish Shell",
    filename: "config.fish",
    description:
      "Modern shell configuration with smart aliases, zoxide integration, and custom functions",
    category: "shell",
    language: "fish",
    features: [
      "Smart directory jumping with zoxide",
      "Modern ls/cat replacements (eza, bat)",
      "Starship prompt integration",
    ],
    code: `set -g fish_greeting ""

# 1. Startup Visuals
if status is-interactive
    # Uses default config if small.jsonc is missing
    fastfetch 
end

# 2. Modern Aliases (Using 'abbr' so they expand as you type!)
abbr -a ls 'eza --icons --group-directories-first'
abbr -a ll 'eza -la --icons --group-directories-first --git'
abbr -a tree 'eza --tree --icons'
abbr -a cat 'bat'
abbr -a afetch 'fastfetch'
abbr -a grep 'grep --color=auto'

# 3. Zoxide & Starship Initialization
zoxide init fish | source
starship init fish | source

# 4. FZF (Fish has its own keybindings built-in)
fzf --fish | source

# 5. Global Variable for 'cd' -> 'z' behavior
alias cd='z'

# Keybindings
bind \\t accept-autosuggestion
bind ctrl-h backward-kill-word`,
    githubPath: "config.fish",
  },
  {
    id: "ghostty-config",
    title: "Ghostty Terminal",
    filename: "config",
    description:
      "AMOLED-optimized terminal with transparency, blur effects, and Cyberdream palette",
    category: "terminal",
    language: "ini",
    features: [
      "True black background with transparency",
      "Display-P3 color space for vivid colors",
      "Custom Cyberdream color palette",
      "Kitty-compatible keybindings",
    ],
    code: `# --- Appearance: AMOLED Black & Transparency ---
background = #000000
background-opacity = 0.8
background-blur = true

# --- Vibrancy & Color Space Fixes ---
# Use display-p3 for wider, punchier color gamut (Fixes faded text)
window-colorspace = display-p3
# Use 'physical' blending to prevent text from 'thinning out' 
alpha-blending = native
# Adds slight weight to the font to hold more color
font-thicken = true

# --- Window Decorations (Pitch Black Titlebar) ---
window-decoration = true
window-theme = ghostty
window-titlebar-background = #000000
window-titlebar-foreground = #ffffff
window-padding-x = 20
window-padding-y = 20


# --- Exact Cyberdream Color Palette (High Saturation) ---
# I've boosted these hex codes to be slightly more vivid to fight the transparency
palette = 0=#16181a
palette = 1=#ff4f3d
palette = 2=#3dff4f
palette = 3=#e9ff3d
palette = 4=#3d8dff
palette = 5=#ad3dff
palette = 6=#3de9ff
palette = 7=#ffffff
palette = 8=#3c4048
palette = 9=#ff6e5e
palette = 10=#5eff6c
palette = 11=#f1ff5e
palette = 12=#5ea1ff
palette = 13=#bd5eff
palette = 14=#5ef1ff
palette = 15=#ffffff

# --- Font & Cursor ---
font-family = "JetBrainsMono Nerd Font"
font-size = 12
cursor-style = bar
cursor-style-blink = true

# --- Keybinds (Kitty Port) ---
keybind = ctrl+t=new_tab
keybind = ctrl+w=close_tab
keybind = ctrl+tab=next_tab
keybind = ctrl+shift+tab=previous_tab
keybind = ctrl+1=goto_tab:1
keybind = ctrl+2=goto_tab:2
keybind = ctrl+3=goto_tab:3
keybind = ctrl+4=goto_tab:4
keybind = ctrl+5=goto_tab:5
keybind = ctrl+6=goto_tab:6
keybind = ctrl+7=goto_tab:7
keybind = ctrl+8=goto_tab:8
keybind = ctrl+9=goto_tab:9
keybind = performable:ctrl+c=copy_to_clipboard
keybind = ctrl+v=paste_from_clipboard

confirm-close-surface = false`,
    githubPath: "Ghostty/config",
  },
  {
    id: "kitty-config",
    title: "Kitty Terminal",
    filename: "kitty.conf",
    description:
      "GPU-accelerated terminal with custom tab bar, cursor trail, and performance optimizations",
    category: "terminal",
    language: "ini",
    features: [
      "Custom pill-shaped tab bar design",
      "Smooth cursor trail animation",
      "High-refresh rate optimizations",
      "JetBrains Mono font with Nerd Font icons",
    ],
    attribution: {
      text: "Inspired by MyLinuxForWork dotfiles",
      url: "https://github.com/mylinuxforwork/dotfiles/blob/main/dotfiles/.config/kitty/kitty.conf",
    },
    code: `#    __ ___ __  __
#   / //_(_) /_/ /___ __
#  / ,< / / __/ __/ // /
# /_/|_/_/\__/\_, /
#                /___/

# --- Core Configuration ---
font_family                 JetBrainsMono Nerd Font
font_size                   12
bold_font                   auto
italic_font                 auto
bold_italic_font            auto
remember_window_size        no
initial_window_width        950
initial_window_height       500
cursor_blink_interval       0.5
cursor_stop_blinking_after  1
scrollback_lines            2000
wheel_scroll_min_lines      1
enable_audio_bell           no
window_padding_width        10
hide_window_decorations     yes
background_opacity          0.8
dynamic_background_opacity  yes
confirm_os_window_close     0
selection_foreground        none
selection_background        none

# --- NEW: Cursor Trail (Native) ---
# Enable the trail (higher = longer, more fluid tail)
cursor_trail                10
# Smooth decay (start_fade end_fade) - 0.1 0.35 creates a 'liquid' feel
cursor_trail_decay          0.1 0.35
# Set to 0 so it animates every single movement (prevents jumpiness)
cursor_trail_start_threshold 0

# Performance: Higher FPS makes the trail smoother (ASUS TUF 144Hz/165Hz)
# Match these to your high-refresh screen
repaint_delay               6
input_delay                 1

# --- Tab Bar Design (The Pill Look) ---
tab_bar_edge            top
tab_bar_style           separator
tab_separator           ""
tab_bar_margin_width    10
tab_bar_margin_height   10 0
tab_bar_min_tabs        1
# --- Inactive Tab Appearance ---
# Background: Dark blue-grey, Text: Muted blue-grey
tab_title_template      "{fmt.fg._1e2124}{fmt.bg.default}{fmt.fg._7b8496}{fmt.bg._1e2124} {index} 󰉋 {title} {fmt.fg._1e2124}{fmt.bg.default} "
# --- Active Tab Appearance ---
# Background: Cyberdream Blue (#5ea1ff), Text: Deep Background (#0a0e14)
active_tab_title_template "{fmt.fg._5ea1ff}{fmt.bg.default}{fmt.fg._0a0e14}{fmt.bg._5ea1ff} {index} 󰉋 {title} {fmt.fg._5ea1ff}{fmt.bg.default} "
active_tab_font_style   bold

# --- Keyboard Shortcuts ---
map ctrl+t      new_tab
map ctrl+w      close_tab
map ctrl+tab    next_tab
map ctrl+shift+tab previous_tab

# Tab Navigation (1-9)
map ctrl+1      goto_tab 1
map ctrl+2      goto_tab 2
map ctrl+3      goto_tab 3
map ctrl+4      goto_tab 4
map ctrl+5      goto_tab 5
map ctrl+6      goto_tab 6
map ctrl+7      goto_tab 7
map ctrl+8      goto_tab 8
map ctrl+9      goto_tab 9

# Copy/Paste
map ctrl+c      copy_or_interrupt
map ctrl+v      paste_from_clipboard

# --- Theme & External Includes ---
include ./custom.conf`,
    githubPath: "Kitty/kitty.conf",
  },
  {
    id: "starship-config",
    title: "Starship Prompt",
    filename: "starship.toml",
    description:
      "Powerline-style prompt with Gruvbox colors, git status, and language detection",
    category: "prompt",
    language: "toml",
    features: [
      "Gruvbox dark color palette",
      "Git branch & status display",
      "Language version detection",
      "Docker/Conda environment info",
    ],
    attribution: {
      text: "Inspired by Starship Discussion #1107",
      url: "https://github.com/starship/starship/discussions/1107#discussioncomment-15013630",
    },
    code: `$schema" = 'https://starship.rs/config-schema.json'

format = """
[](color_orange)\
$os\
$username\
[ ](fg:color_orange)\
[](color_yellow)\
$directory\
[ ](fg:color_yellow)\
([](color_aqua)\
$git_branch\
$git_status\
[ ](fg:color_aqua))\
([](color_blue)\
$c\
$cpp\
$rust\
$golang\
$nodejs\
$php\
$java\
$kotlin\
$haskell\
$python\
[ ](fg:color_blue))\
([](color_bg3)\
$docker_context\
$conda\
$pixi\
[ ](fg:color_bg3))\
[](color_bg1)\
$time\
[ ](fg:color_bg1)\
$line_break$character
"""

palette = 'gruvbox_dark'

[palettes.gruvbox_dark]
color_fg0 = '#fbf1c7'
color_bg1 = '#3c3836'
color_bg3 = '#665c54'
color_blue = '#458588'
color_aqua = '#689d6a'
color_green = '#98971a'
color_orange = '#d65d0e'
color_purple = '#b16286'
color_red = '#cc241d'
color_yellow = '#d79921'

[os]
disabled = false
style = "bg:color_orange fg:color_fg0"

[os.symbols]
Windows = "󰍲"
Ubuntu = "󰕈"
SUSE = ""
Raspbian = "󰐿"
Mint = "󰣭"
Macos = "󰀵"
Manjaro = ""
Linux = "󰌽"
Gentoo = "󰣨"
Fedora = "󰣛"
Alpine = ""
Amazon = ""
Android = ""
AOSC = ""
Arch = "󰣇"
Artix = "󰣇"
EndeavourOS = ""
CentOS = ""
Debian = "󰣚"
Redhat = "󱄛"
RedHatEnterprise = "󱄛"
Pop = ""

[username]
show_always = true
style_user = "bg:color_orange fg:color_fg0"
style_root = "bg:color_orange fg:color_fg0"
format = '[ $user ]($style)'

[directory]
style = "fg:color_fg0 bg:color_yellow"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = "󰝚 "
"Pictures" = " "
"Developer" = "󰲋 "

[git_branch]
symbol = ""
style = "bg:color_aqua"
format = '[[ $symbol $branch ](fg:color_fg0 bg:color_aqua)]($style)'

[git_status]
style = "bg:color_aqua"
format = '[[($all_status$ahead_behind )](fg:color_fg0 bg:color_aqua)]($style)'

[nodejs]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[c]
symbol = " "
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[cpp]
symbol = " "
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[rust]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[golang]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[php]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[java]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[kotlin]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[haskell]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[python]
symbol = ""
style = "bg:color_blue"
format = '[[ $symbol( $version) ](fg:color_fg0 bg:color_blue)]($style)'

[docker_context]
symbol = ""
style = "bg:color_bg3"
format = '[[ $symbol( $context) ](fg:#83a598 bg:color_bg3)]($style)'

[conda]
style = "bg:color_bg3"
format = '[[ $symbol( $environment) ](fg:#83a598 bg:color_bg3)]($style)'

[pixi]
style = "bg:color_bg3"
format = '[[ $symbol( $version)( $environment) ](fg:color_fg0 bg:color_bg3)]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:color_bg1"
format = '[[  $time ](fg:color_fg0 bg:color_bg1)]($style)'

[line_break]
disabled = false

[character]
disabled = false
success_symbol = '[>](bold fg:color_green)'
error_symbol = '[>](bold fg:color_red)'
vimcmd_symbol = '[<](bold fg:color_green)'
vimcmd_replace_one_symbol = '[<](bold fg:color_purple)'
vimcmd_replace_symbol = '[<](bold fg:color_purple)'
vimcmd_visual_symbol = '[<](bold fg:color_yellow)'`,
    githubPath: "Starship/starship.toml",
  },
  {
    id: "fastfetch-config",
    title: "Fastfetch",
    filename: "config.jsonc",
    description:
      "System information display with custom layout and hardware details",
    category: "system",
    language: "json",
    features: [
      "Compact Arch Linux branding",
      "Hardware monitoring (CPU, GPU, RAM)",
      "Disk usage for dual-boot setup",
      "Battery status display",
    ],
    attribution: {
      text: "Inspired by MyLinuxForWork dotfiles",
      url: "https://github.com/mylinuxforwork/dotfiles/blob/main/dotfiles/.config/fastfetch/config.jsonc",
    },
    code: `// Inspired by Catnap - Organized Edition
{
    "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/dev/doc/json_schema.json",
    "logo": {
        "source": "arch",  
        "type":"small",
        "padding": { "top": 2 }  
    },
    "display": { "separator": " " },
    "modules": [
        { "key": "╭───────────╮", "type": "custom" },
        // --- GROUP 1: IDENTITY ---
        { "key": "│ {#31} user    {#keys}│", "type": "title", "format": "{user-name}" },
        { "key": "│ {#32}󰇅 hname   {#keys}│", "type": "title", "format": "{host-name}" },
        { "key": "│ {#34}󰅐 uptime  {#keys}│", "type": "uptime" },
        { "key": "├───────────┤", "type": "custom" }, 
        // --- GROUP 2: SOFTWARE ---
        { "key": "│ {#33}󰏖 pkgs    {#keys}│", "type": "packages" },
        { 
            "key": "│ {#34}{icon} distro  {#keys}│", 
            "type": "os"
        },
        { "key": "│ {#35} kernel  {#keys}│", "type": "kernel" },
        { "key": "│ {#36} wm      {#keys}│", "type": "wm" },
        { "key": "│ {#31} term    {#keys}│", "type": "terminal" },
        { "key": "│ {#32} shell   {#keys}│", "type": "shell" },
        { "key": "├───────────┤", "type": "custom" }, 
        // --- GROUP 3: HARDWARE ---
        { "key": "│ {#33}󰍛 cpu     {#keys}│", "type": "cpu", "showPeCoreCount": true },
        { "key": "│ {#35}󰢮 gpu     {#keys}│", "type": "gpu", "hideType": "integrated" },
        { "key": "│ {#34}󰉉 windows {#keys}│", "type": "disk", "folders": "/mnt/Windows" },
        { "key": "│ {#34}󰉉 linux   {#keys}│", "type": "disk", "folders": "/" },
        { "key": "│ {#36} memory  {#keys}│", "type": "memory" },
        { "key": "│ {#31}󰁹 battery {#keys}│", "type": "battery" },
        { "key": "╰───────────╯", "type": "custom" }
    ]
}`,
    githubPath: "fastfetch/config.jsonc",
  },
  {
    id: "fastfetch-small-config",
    title: "Fastfetch (Small)",
    filename: "small.jsonc",
    description:
      "Minimal system information display with compact Arch Linux branding",
    category: "system",
    language: "json",
    features: [
      "Compact single-line layout",
      "Essential system info only",
      "Arch Linux logo",
      "Used in Fish shell greeting",
    ],
    code: `{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/master/doc/json_schema.json",
  "logo": {
    "source": "arch", 
    "type": "small",
    "padding": { "top": 1 }
  },
  "display": { "separator": " " },
  "modules": [
    { "type": "custom", "key": "╭───────────╮" },

    { 
      "type": "os", 
      "key": "│ {#34}󰏖 os      {#keys}│" 
    },
    { "type": "kernel",   "key": "│ {#35} kernel  {#keys}│" },
    { "type": "uptime",   "key": "│ {#34}󰅐 uptime  {#keys}│" },
    { "type": "terminal", "key": "│ {#31} term    {#keys}│" },
    { "type": "shell",    "key": "│ {#32} shell   {#keys}│" },
    { "type": "packages", "key": "│ {#33}󰏖 pkgs    {#keys}│" },

    { "type": "custom", "key": "╰───────────╯" }
  ]
}`,
    githubPath: "fastfetch/small.jsonc",
  },
];

export const categories = [
  { id: "shell", label: "Shell", icon: "terminal" },
  { id: "terminal", label: "Terminal", icon: "square" },
  { id: "prompt", label: "Prompt", icon: "chevronRight" },
  { id: "system", label: "System", icon: "cpu" },
] as const;

export const dependencies = {
  core: ["fish", "dconf"],
  tools: ["eza", "bat", "fastfetch", "zoxide", "starship", "fzf"],
  installCommand:
    "sudo pacman -S fish dconf eza bat fastfetch zoxide starship fzf",
};
