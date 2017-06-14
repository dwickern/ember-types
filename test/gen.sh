#!/usr/bin/env bash

output=$(pwd)/guides
guides=~/code/ember-guides/source/localizable

# separate multiple code blocks in a file
separator="-----separator-----"

# exclude localized docs (e.g. "run-loop.en-US.md")
{ cd ${guides} && find ./applications \
 -type f \
 -name '*.md' \
 -not -regex '.*\.[a-z]\{2\}-[A-Z]\{2\}\.md$'; } | {
  while read path; do
    echo "Processing ${path}"

    input="${guides}/${path}"
    mkdir -p $(dirname ${output}/${path})

    # match these styles of code blocks:
    # ```app/controllers/foo.js
    # ```app/router.js{+10}
    # ```javascript
    ( cat ${input} | ../node_modules/.bin/codedown '**/*.js*' "${separator}";
      cat ${input} | ../node_modules/.bin/codedown javascript "${separator}"; ) | {

      created="no"
      i=1
      out=${output}/${path%.*}-${i}.ts
      while IFS= read line; do
        if [ "${line}" == "${separator}" ]; then
          i=$[i+1]
          out=${output}/${path%.*}-${i}.ts
          created="no"
        else
          if [[ ${created} == "no" ]]; then
            if [[ -z "${line}" ]]; then
              # skip empty line at beginning of file
              continue;
            fi

            echo -n > ${out}
            created="yes"
          fi
          echo "${line}" >> ${out};
        fi
      done
    }
  done
}
