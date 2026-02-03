$path = "c:\Users\ADMIN\Desktop\Prabhuji\prabuji\client\src\components\TirthYatraManagement.jsx"
$lines = Get-Content $path
$headers = $lines[0..969]
$footers = $lines[1058..($lines.Count-1)]
$newContent = $headers + $footers
$newContent | Set-Content $path -Encoding UTF8
Write-Host "Repaired file."
