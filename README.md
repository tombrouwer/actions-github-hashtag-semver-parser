# Hashtag semver parser

This action checks for the tags `#major`, `#minor` and `#patch` in the commit messages. The output will be one of these tags or the default given in the input. If no default is set, and there is no tag in your messages it wil fail.

## Inputs

### `default_semver`

The default output

## Outputs

### `semver`

The semver key found in your messages or set by default.

## Example usage

```
  - name: Get semver key from commit messages
    id: semverKey
    uses: TomBrouwer/actions-github-packages-monorepo@master
```

You can use your output in another step.

```
  - run: npm version $SEMVER
    env:
      SEMVER: ${{ steps.semverKey.outputs.semver }}
```
