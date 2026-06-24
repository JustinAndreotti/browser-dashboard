# browser-dashboard
Work in progress browser/server dashboard

## Note About Project
This is a personal project for my home server, it is not intended to be used by others but if you'd like to get it working you can. You may notice in some files an extensive amount of comments or just text explaining what stuff does. Thats just my way of learning I guess. 

## Get an open weather API key for free here:
- https://openweathermap.org/


# Dev Branch update 6/11/2026:

- Expanded the homepage. Server statistics and uptime pings still not available
- Added a dashboard, and a "library" for all my services to add to the dash
- basic dashboard formatting

Since the dashboard works with base functionality, and I am successfully using it on the dev branch day to day, im pushing to main before I make further changes

## Quicklook at current milestone
<img width="1188" height="834" alt="image" src="https://github.com/user-attachments/assets/2778873b-24b2-4f4b-9b6e-28e8f236c70c" />

<img width="1177" height="624" alt="image" src="https://github.com/user-attachments/assets/66ad7f7f-c52c-45b2-b48d-cadd3d4fffdd" />

# Dev Branch Update 6/23/2026:
- Added a way to view the compose files for each service that you have on your dashboard
- You can configure the paths to where your containers are stored on the host side, and then it *SHOULD* automatically handle it from there
- If the service is something like an external web link or proprietary to the operating system like ZimaOS' dashboard, filebrowser, and web terminal, make sure you set the containerType in services.js to `"none"` so that it doesnt try to retreive the compose file. 
- TODO: Might want to make it so there just is no button to open the compose file on services that don't have a compose file. 

## Quicklook at current milestone
<img width="1390" height="908" alt="image" src="https://github.com/user-attachments/assets/11a7d7e5-fc4f-4638-b9bc-bcad3c99932e" />

