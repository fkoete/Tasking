# Express Services — Git Maintenance Guide

This guide covers safe maintenance and deployment of the Tasker247 Express Services page.

**Important:** The Express Services page is part of the existing `Tasking` Git repository. It is not a separate repository. Work from the repository root unless a command explicitly says otherwise.

## 1. Files and change boundaries

The relevant files are:

```text
Tasking-1/
├── style.css                         # Shared site-wide stylesheet
└── express-services/
    ├── index.html                    # Express Services page content
    ├── express-services.css          # Styles specific to this page
    ├── express-services.js           # Behaviour specific to this page
    └── README.md                     # This maintenance guide
```

### CSS isolation — read before staging or committing

- `style.css` is the **shared stylesheet**. Changes to it can affect other pages across the website.
- `express-services/express-services.css` is the page-specific stylesheet. Prefer it for styling changes that belong only to Express Services.
- Do not stage or commit either CSS file merely because it appears as modified in `git status`.
- If the task only changes service wording, prices, HTML structure or page content, normally stage **only** `express-services/index.html`.
- If a page-specific visual change is required, review and stage `express-services/express-services.css` separately.
- Only stage the root `style.css` when a deliberate site-wide change is required, its impact has been reviewed, and that change is intended for deployment.
- Never use `git add .` or `git add -A` for routine Express Services updates. These commands can include unrelated work.

A modified file shown by `git status --short` is not automatically part of a commit. Only staged files are included in the next commit.

## 2. Open PowerShell at the repository root

Use the actual local repository path:

```powershell
cd "C:\Users\User\OneDrive\Documents\NOHLOMELO\TASKER247\LIVE SITE\Tasking-1"
```

Confirm that this is the correct repository:

```powershell
git rev-parse --show-toplevel
git branch --show-current
```

The expected branch for this workflow is `main`.

## 3. Check the working tree before making changes

Run:

```powershell
git status --short
```

This identifies modified, staged and untracked files.

The two status columns have different meanings:

- ` M filename` — modified in the working tree, not staged.
- `M  filename` — staged for the next commit.
- `?? filename` — untracked file.

If unrelated files are modified, leave them alone. Do not discard them just to make the status output clean. If you are unsure whether an existing change belongs to this task, inspect it before proceeding.

Before starting a new maintenance task, make sure you understand any existing local changes. Do not overwrite or discard another piece of work.

## 4. Bring the local branch up to date

When the working tree is clean and you are ready to start a new task, run:

```powershell
git pull origin main
```

This retrieves and integrates the latest changes from GitHub.

Do not run `git pull` over uncommitted work without first reviewing that work. If Git reports a conflict, stop and resolve it deliberately rather than overwriting files.

## 5. Edit and test the Express Services page

Make the required changes in the relevant file:

| Type of change | File to review |
|---|---|
| Service names, descriptions, inclusions, prices and HTML content | `express-services/index.html` |
| Express Services page layout, colours, spacing and responsive styling | `express-services/express-services.css` |
| Express Services interactions and behaviour | `express-services/express-services.js` |
| A deliberate site-wide styling change | Root `style.css` |

Preview the page locally before committing. Check the affected content and test relevant navigation, expandable sections, buttons and links. If the HTML has changed, run it through the W3C Markup Validation Service where appropriate.

Do not enable checkout or payment controls unless the payment workflow has been implemented and tested.

## 6. Check whitespace and inspect the changes

From the repository root, run:

```powershell
git diff --check
```

This checks unstaged changes for whitespace problems, including spaces or tabs at the ends of lines. No output means no whitespace problems were found in that diff.

Then inspect the intended HTML change:

```powershell
git diff -- express-services/index.html
```

For page-specific CSS, inspect it separately:

```powershell
git diff -- express-services/express-services.css
```

For the shared stylesheet, inspect it separately and carefully:

```powershell
git diff -- style.css
```

Do not stage a file until you have reviewed its changes and confirmed they belong in this deployment.

## 7. Stage only the file or files required for this task

### Usual case: HTML/content-only update

For prices, descriptions or other HTML-only changes:

```powershell
git add express-services/index.html
```

This is the key isolation step. It stages the Express Services HTML file only. It does not stage the modified root `style.css`.

### If page-specific CSS is intentionally part of the task

Only after reviewing and confirming that the CSS change is required:

```powershell
git add express-services/express-services.css
```

### If a site-wide CSS change is intentionally required

Only after reviewing the impact on the wider website:

```powershell
git add style.css
```

Do not run that command for an unrelated or incidental modification.

You can stage more than one explicitly approved file by naming each path:

```powershell
git add express-services/index.html express-services/express-services.css
```

Do not use `git add .` or `git add -A` as a shortcut.

## 8. Verify exactly what is staged

Run these commands in order:

```powershell
git diff --cached --check
git diff --cached --stat
git status --short
```

They respectively:

1. Check staged changes for whitespace errors.
2. Summarise the staged files and the size of the change.
3. Show which files are staged and which remain unstaged.

For an HTML-only update, the expected status pattern is:

```text
M  express-services/index.html
 M style.css
```

The first column indicates that the HTML file is staged. The second column on the `style.css` line indicates that the shared stylesheet remains modified but unstaged.

The exact filenames may differ for another task. The principle does not change: **only the files deliberately approved for this commit should have a staged status.**

If you accidentally staged the shared stylesheet, but want to keep its local edits, unstage it with:

```powershell
git restore --staged style.css
```

This removes `style.css` from the staging area but preserves its working-copy edits. Do not use `git restore style.css` for this purpose: that command can discard the local edits themselves.

If you accidentally staged several files and need to reset the staging area without discarding file edits, you can unstage all staged changes with:

```powershell
git restore --staged .
```

Then stage only the intended file paths again and repeat the checks.

## 9. Commit the verified changes

Only after the staged file list and staged diff have been checked, commit with a message describing the actual work.

Example:

```powershell
git commit -m "Update company formation package pricing"
```

Use a different concise message when the task is different, for example:

```powershell
git commit -m "Update Express Services page descriptions"
```

A commit records the staged changes. It does not automatically include other modified, unstaged files.

Verify the new commit and remaining working-tree changes:

```powershell
git log -1 --oneline
git status --short
```

If `style.css` is still shown as modified, it remains outside the commit unless it was explicitly staged.

## 10. Push the commit to GitHub

Once the commit is verified:

```powershell
git push origin main
```

This sends the committed changes on the local `main` branch to the `main` branch on GitHub.

A successful push should report that `main` was updated. If the push is rejected, stop and inspect the message; do not force-push as a routine workaround.

After pushing, check:

```powershell
git status --short
git log -1 --oneline
```

A successful push does not mean every local modification was deployed. Uncommitted and unstaged files remain local.

## 11. Verify the published page

After GitHub Pages has processed the push, open:

<https://www.tasker247.com/express-services/>

Check the updated content in the browser. If the old version appears, refresh the page and allow a short time for deployment and browser caching.

## 12. Quick reference: safe HTML-only update

For a normal pricing or wording update, this is the recommended sequence, starting from a reviewed working tree:

```powershell
git status --short
git pull origin main
# Edit and test express-services/index.html
git diff --check
git diff -- express-services/index.html
git add express-services/index.html
git diff --cached --check
git diff --cached --stat
git status --short
git commit -m "Describe the HTML update"
git log -1 --oneline
git status --short
git push origin main
```

Run `git pull origin main` only when the working tree is clean and ready to update. Replace the example commit message with one that accurately describes the work.

---

## Operating rule

**Protect the scope of every deployment.** Review `git status`, inspect the actual diff, stage explicit file paths, verify the staged files, and only then commit and push. In particular, keep the shared root `style.css` out of an Express Services-only deployment unless a site-wide CSS change is intentional and approved.
