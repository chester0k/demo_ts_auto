#!/bin/bash

# Microsoft Teams Webhook URL
webhook_url="https://webhook.url/dssadasd-dasdasd"

# Path to the results.json file
results_file="./reports/monocart-report/report.json"

# Read the passed and failed test counts from the results.json file
passed_tests=$(jq -r '.summary.passed.value' "$results_file")
failed_tests=$(jq -r '.summary.failed.value' "$results_file")
flaky_tests=$(jq -r '.summary.flaky.value' "$results_file")
skipped_tests=$(jq -r '.summary.skipped.value' "$results_file")

# Jenkins Build
jenkins_build_url="$1"
jenkins_build_number="$2"

# Validate if the Jenkins build URL is provided
if [[ -z $jenkins_build_url ]]; then
  echo "Jenkins build URL is required. Please provide it as a command-line argument."
  exit 1
fi

# Prepare the Adaptive Card JSON payload
adaptive_card_payload=$(cat <<EOF
{
   "type":"message",
   "attachments":[
      {
         "contentType":"application/vnd.microsoft.card.adaptive",
         "contentUrl":null,
         "content":{
            "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
            "type":"AdaptiveCard",
            "version":"1.2",
            "body":[
               {
                "type": "TextBlock",
                "style": "heading",
                 "size": "medium",
                  "weight": "bolder",
                "text": "Automation run build #$jenkins_build_number"
                },
                {
                "type": "TextBlock",
                "text": "**Passed**: $passed_tests",
                "color": "good"
                },
                {
                "type": "TextBlock",
                "text": "**Failed**: $failed_tests",
                "color": "attention"
                },
                 {
                "type": "TextBlock",
                "text": "**Flaky**: $passed_tests"
                },
                {
                "type": "TextBlock",
                "text": "**Skipped**: $failed_tests"
                }
            ],
            "actions": [
               {
                  "type": "Action.OpenUrl",
                  "title": "View Build",
                  "url": "$jenkins_build_url"
            }
            ]
         }
      }
   ]
}
EOF
)

# Send the Adaptive Card to Microsoft Teams using cURL
curl -H "Content-Type: application/json" -d "$adaptive_card_payload" $webhook_url
