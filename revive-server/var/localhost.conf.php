;<?php exit; ?>
;*** DO NOT REMOVE THE LINE ABOVE ***

[openads]
installed=1
requireSSL=
sslPort=443

[ui]
enabled=1
applicationName=
headerFilePath=
footerFilePath=
logoFilePath=
headerForegroundColor=
headerBackgroundColor=
headerActiveTabColor=
headerTextColor=
gzipCompression=1
supportLink=
combineAssets=1
dashboardEnabled=1
hideNavigator=
zoneLinkingStatistics=1
disableDirectSelection=1
displayNameLength=60
loaderDelay=250

[database]
type=mysqli
host=localhost
socket=
port=3306
username=root
password=
name=revive
persistent=
protocol=tcp
compress=
ssl=
capath=
ca=

[databaseCharset]
checkComplete=1
clientCharset=

[databaseMysql]
statisticsSortBufferSize=

[databasePgsql]
schema=

[webpath]
admin="localhost/admin"
delivery="localhost/delivery"
deliverySSL="localhost/delivery"
images="localhost/images"
imagesSSL="localhost/images"

[file]
asyncjs="asyncjs.php"
asyncjsjs="async.js"
asyncspc="asyncspc.php"
click="ck.php"
signedClick="cl.php"
conversionvars="tv.php"
content="ac.php"
conversion="ti.php"
conversionjs="tjs.php"
frame="afr.php"
image="ai.php"
js="ajs.php"
layer="al.php"
log="lg.php"
popup="apu.php"
view="avw.php"
frontcontroller="fc.php"
singlepagecall="spc.php"
spcjs="spcjs.php"
xmlrest="ax.php"

[store]
mode=
webDir="/Users/kartik/Documents/NightReach/main/nightreach/revive-server/www/images"
ftpHost=
ftpPath=
ftpUsername=
ftpPassword=
ftpPassive=
maxFilesize=0

[allowedBanners]
sql=
web=1
url=1
html=1
text=1
video=

[delivery]
cacheExpire=1200
cacheStorePlugin="deliveryCacheStore:oxCacheFile:oxCacheFile"
cachePath=
acls=1
aclsDirectSelection=1
obfuscate=
ctDelimiter=__
chDelimiter=","
keywords=
cgiForceStatusHeader=
clicktracking=
ecpmSelectionRate="0.9"
enableControlOnPureCPM=1
assetClientCacheExpire=3600
secret="o8cqReEUoMUPC3V9vWCqcivjlzy9hAd756+OtUCXcC0="
clickUrlValidity=0
relAttribute="noopener nofollow"
relPreconnect=

[defaultBanner]
invalidZoneHtmlBanner=
suspendedAccountHtmlBanner=
inactiveAccountHtmlBanner=

[privacy]
disableViewerId=1
anonymiseIp=1

[graphs]
ttfDirectory=
ttfName=

[logging]
adRequests=
adImpressions=1
adClicks=1
trackerImpressions=1
reverseLookup=
proxyLookup=1
defaultImpressionConnectionWindow=
defaultClickConnectionWindow=
ignoreHosts=
ignoreUserAgents=
enforceUserAgents=
blockAdClicksWindow=0
blockInactiveBanners=1

[maintenance]
autoMaintenance=1
timeLimitScripts=1800
operationInterval=60
blockAdImpressions=0
blockAdClicks=0
channelForecasting=
pruneCompletedCampaignsSummaryData=
pruneDataTables=1
ecpmCampaignLevels="9|8|7|6"

[priority]
instantUpdate=1
intentionalOverdelivery=0
defaultClickRatio="0.005"
defaultConversionRatio="0.0001"
randmax=2147483647

[performanceStatistics]
defaultImpressionsThreshold=10000
defaultDaysIntervalThreshold=30

[table]
prefix=rv_
type=MYISAM
account_preference_assoc=account_preference_assoc
account_user_assoc=account_user_assoc
account_user_permission_assoc=account_user_permission_assoc
accounts=accounts
acls=acls
acls_channel=acls_channel
ad_category_assoc=ad_category_assoc
ad_zone_assoc=ad_zone_assoc
affiliates=affiliates
affiliates_extra=affiliates_extra
agency=agency
application_variable=application_variable
audit=audit
banners=banners
campaigns=campaigns
campaigns_trackers=campaigns_trackers
category=category
channel=channel
clients=clients
data_intermediate_ad=data_intermediate_ad
data_intermediate_ad_connection=data_intermediate_ad_connection
data_intermediate_ad_variable_value=data_intermediate_ad_variable_value
data_raw_ad_click=data_raw_ad_click
data_raw_ad_impression=data_raw_ad_impression
data_raw_ad_request=data_raw_ad_request
data_raw_tracker_impression=data_raw_tracker_impression
data_raw_tracker_variable_value=data_raw_tracker_variable_value
data_summary_ad_hourly=data_summary_ad_hourly
data_summary_ad_zone_assoc=data_summary_ad_zone_assoc
data_summary_channel_daily=data_summary_channel_daily
data_summary_zone_impression_history=data_summary_zone_impression_history
images=images
log_maintenance_forecasting=log_maintenance_forecasting
log_maintenance_priority=log_maintenance_priority
log_maintenance_statistics=log_maintenance_statistics
password_recovery=password_recovery
placement_zone_assoc=placement_zone_assoc
preferences=preferences
session=session
targetstats=targetstats
trackers=trackers
tracker_append=tracker_append
userlog=userlog
users=users
variables=variables
variable_publisher=variable_publisher
zones=zones

[email]
logOutgoing=1
headers=
qmailPatch=
fromName=
fromAddress=
fromCompany=
useManagerDetails=

[log]
enabled=1
methodNames=
lineNumbers=
type=file
name="debug.log"
priority=6
ident=OX
paramsUsername=
paramsPassword=
fileMode=0644

[deliveryLog]
enabled=
name="delivery.log"
fileMode=0644
priority=6

[cookie]
permCookieSeconds=31536000
maxCookieSize=2048
domain=
viewerIdDomain=
disabled=
adminDomain=

[debug]
logfile=
production=1
sendErrorEmails=
emailSubject="Error from Revive Adserver"
email="email@example.com"
emailAdminThreshold=3
errorOverride=1
showBacktrace=
disableSendEmails=

[var]
prefix=OA_
cookieTest=ct
cacheBuster=cb
channel=source
dest=dest
signature=sig
timestamp=ts
logClick=log
n=n
params=oaparams
viewerId=OAID
viewerGeo=OAGEO
campaignId=campaignid
adId=bannerid
creativeId=cid
zoneId=zoneid
blockAd=OABLOCK
capAd=OACAP
sessionCapAd=OASCAP
blockCampaign=OACBLOCK
capCampaign=OACCAP
sessionCapCampaign=OASCCAP
blockZone=OAZBLOCK
capZone=OAZCAP
sessionCapZone=OASZCAP
vars=OAVARS
trackonly=trackonly
openads=openads
lastView=OXLIA
lastClick=OXLCA
blockLoggingClick=OXBLC
fallBack=oxfb
trace=OXTR
product=revive

[lb]
enabled=
type=mysql
host=localhost
port=3306
username=
password=
name=
persistent=

[sync]
checkForUpdates=1
shareStack=1

[oacSync]
protocol=https
host="sync.revive-adserver.com"
path="/xmlrpc.php"
httpPort=80
httpsPort=443

[authentication]
type=internal
deleteUnverifiedUsersAfter=2419200

[geotargeting]
type=
showUnavailable=

[pluginPaths]
packages="/plugins/etc/"
plugins="/plugins/"
admin="/www/admin/plugins/"
var="/var/plugins/"

[pluginSettings]
enableOnInstall=1
useMergedFunctions=1

[plugins]

[pluginGroupComponents]

[audit]
enabled=1
enabledForZoneLinking=

[security]
passwordMinLength=12
badLoginLogPath=
