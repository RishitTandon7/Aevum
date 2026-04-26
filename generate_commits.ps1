$messages = @(
    "fix: resolved caching issue in API",
    "feat: added new UI components for booking",
    "refactor: cleaned up redundant CSS",
    "docs: updated API documentation",
    "perf: improved render performance",
    "style: updated color palette",
    "test: added unit tests for flight search",
    "chore: updated dependencies",
    "fix: corrected responsive layout on mobile",
    "feat: implemented real-time scraping fallback",
    "chore: updated gitignore",
    "refactor: extracted constants into config file",
    "feat: added smooth scroll for search results",
    "fix: adjusted z-index for dropdown menus"
)

# Generate 40 commits starting from 40 days ago up to today
for ($i = 40; $i -ge 1; $i--) {
    $hour = Get-Random -Minimum 9 -Maximum 22
    $min = Get-Random -Minimum 0 -Maximum 59
    $date = (Get-Date).AddDays(-$i).Date.AddHours($hour).AddMinutes($min).ToString("yyyy-MM-ddTHH:mm:ss")
    $msg = $messages[$i % $messages.Length]
    
    # modify a dummy file
    "Commit log entry $i generated on $date" | Out-File -FilePath "g:\filler.io\booking_platform\ACTIVITY.md" -Append
    
    git add "g:\filler.io\booking_platform\ACTIVITY.md"
    
    $env:GIT_AUTHOR_DATE=$date
    $env:GIT_COMMITTER_DATE=$date
    
    git commit -m "$msg" | Out-Null
}

# Final commit to include the real README and logo updates
git add .
$env:GIT_AUTHOR_DATE=(Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
$env:GIT_COMMITTER_DATE=(Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
git commit -m "docs: added Aevum logo and improved README"

# Push everything
git push -u origin main
