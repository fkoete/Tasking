## Tasker247 Website Maintenance Commands

## Windows PowerShell Commands for Bulk Edits

### 1. Replace Ampersand with Pipe in Sitemap Link
**Purpose**: Replaces the ampersand symbol (&) with a pipe character (|) before the sitemap link in all HTML pages.

**Command**:
```powershell
cd $PSScriptRoot
Get-ChildItem -Path . -Filter "*.html" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '&amp;</span> <a href=".*/sitemap.html"', '|</span> <a href="sitemap.html"'
    $content = $content -replace '<span class="t247-footer-separator">&amp;</span>', '<span class="t247-footer-separator">|</span>'
    Set-Content $_.FullName $content -Encoding UTF8
}
Write-Host "Ampersand to pipe replacement completed in all HTML files."
```

**Usage**: Run this command from the root directory to update all .html files.

---

### 2. Verify Sitemap Styling Consistency
**Purpose**: Ensures sitemap.html uses consistent colors, fonts, and styling with the rest of the site.

The sitemap.html file is styled using:
- **Color Scheme**: Navy (#071f3d), Blue (#0d568f), Gold (#d3a33b), etc. (defined in tasker247-sitemap.css)
- **Fonts**: Arial, Helvetica, sans-serif (matching main site)
- **CSS File**: tasker247-sitemap.css contains all sitemap-specific styling
- **Structure**: Uses semantic HTML with consistent class naming (t247-* prefix)

**Verification Command**:
```powershell
# Check if sitemap.html and sitemap.css are properly linked
$sitemapPath = ".\sitemap.html"
$content = Get-Content $sitemapPath -Raw
if ($content -match 'tasker247-sitemap.css') {
    Write-Host "✓ Sitemap CSS is properly linked"
} else {
    Write-Host "✗ Sitemap CSS link is missing"
}

# Display sitemap styling colors
Write-Host "`nCurrent Sitemap Color Scheme:"
Write-Host "Navy: #071f3d"
Write-Host "Blue: #0d568f"
Write-Host "Gold: #d3a33b"
Write-Host "Font: Arial, Helvetica, sans-serif"
```

---

### 3. Build Website (existing command)
**Purpose**: Builds the website using the build script.

**Command**:
```powershell
cd scripts 
.\build.ps1
```

**Usage**: Run from root directory to execute the build script.

---

## Notes
- All ampersand symbols in footer links have been replaced with pipe characters (|)
- Changes affect 17+ HTML pages including: index.html, aboutus.html, blog-single.html, faqs.html, etc.
- The includes/footer.html file is the source template; update it to apply changes to all pages using includes
- Sitemap.html uses a minimalist design intentionally for better readability but maintains brand consistency through the t247-* design system
- All styling is minified in tasker247-sitemap.css for performance


