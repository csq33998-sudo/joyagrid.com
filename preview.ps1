$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = "C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path $bundledNode) { $bundledNode } else { "node" }
$port = if ($env:PORT) { $env:PORT } else { "4173" }

Set-Location $root
$env:PORT = $port
Write-Host "Joya Grid preview: http://127.0.0.1:$port/"
Write-Host "Keep this window open while previewing. Press Ctrl+C to stop."
& $node serve.js
