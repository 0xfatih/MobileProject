$outputFile = "all_code.txt"
$sourceDir = ".\src"
$fileTypes = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.html", "*.json")

# Create or clear the output file
Clear-Content -Path $outputFile -ErrorAction SilentlyContinue

Get-ChildItem -Path $sourceDir -Recurse -Include $fileTypes | ForEach-Object {
    $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
    Add-Content -Path $outputFile -Value "`n================================================================================`n"
    Add-Content -Path $outputFile -Value "FILE: $relativePath"
    Add-Content -Path $outputFile -Value "================================================================================`n"
    Get-Content -Path $_.FullName | Add-Content -Path $outputFile
}

Write-Host "All code has been bundled into $outputFile"
