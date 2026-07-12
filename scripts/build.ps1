$projectRoot = Split-Path $PSScriptRoot -Parent

$header = Get-Content "$projectRoot\includes\header.html" -Raw
$footer = Get-Content "$projectRoot\includes\footer.html" -Raw

$htmlFiles = Get-ChildItem $projectRoot -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
    if ($file.FullName -like "*includes*") {
        continue
    }

    $content = Get-Content $file.FullName -Raw

    $content = [regex]::Replace(
        $content,
        '(?s)<!-- HEADER_START -->.*?<!-- HEADER_END -->',
        "<!-- HEADER_START -->`r`n$header`r`n<!-- HEADER_END -->"
    )
    
    $content = [regex]::Replace(
        $content,
        '(?s)<!-- FOOTER_START -->.*?<!-- FOOTER_END -->',
        "<!-- FOOTER_START -->`r`n$footer`r`n<!-- FOOTER_END -->"
    )
   
    Set-Content $file.FullName $content
}

Write-Host ""
Write-Host "Website rebuilt successfully."