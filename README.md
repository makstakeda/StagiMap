<h1>Sunimap</h1>

<p>Sunimap is a simple friendly Yandex.Maps's configurator. Mission of that library is to give any developer without needed experience simple ways of customizing and setting of maps for different projects. Just with few rows you can build your own functional map.</p>

<p>This library was not created for flexible setting. This project include the most popular Yandex.Maps' abilities and provide you new experience of work with it.</p>

<h5>Main abilities of library:</h5>

<p>• Map's customizing and including with few rows
<br>• Simple adding and work with map's points
<br>• Choosing of points' view method with one parametr
<br>• Integration of map with HTML for controlling
<br>• Simple methods of groups' creation and control of it
<br>• Simple route builder and adding of transfer's points
<br>• Simple adding of styles
<br>• Configuration of control elements</p>

<h2>Tutorial</h2>

<h3>1. Starting to work</h3>

<p>You need to download library and include that JS-file to your page. Also you need to choose language of map's localization in RFC-3066 format. For example,</p>

<h3>2. Map's settings</h3>

<p>For map's customizing and setting you need to use simple JS-object with name "smOptions". You can include this object to any part of your code at page. If you didn't choose any option - library will use default options for map's building.</p>

<h4>2.1. Setting of main parameters</h4>

<p>Main parameters include geographical coordinates of map's center, working area, minimum, maximum and initial zoom.</p>

<p>smOptions.center - set geographical coordinates of map's center. Format: array with latitude and longitude, for example, [34.4481, -119.2429].</p>

<p>smOptions.restrictArea - set working area with restricted borders. Format: multidimensional array with coordinates of left-top border point and right-bottom border point, for example, [[60.055334,30.038404], [59.812399,30.484037]].</p>

<p>smOptions.initialZoom - set initial zoom. Format: number between 1 and 16.</p>

<p>smOptions.maxZoom - set maximum zoom. Format: number between 1 and 16.</p>

<p>smOptions.minZoom - set minimum zoom. Format:  number between 1 and 16.</p>

<h4>2.2. Setting of controlling buttons</h4>

<p>At this moment moment library provide ability to work with zoom's buttons and location's button.</p>

<h5>2.2.1. Setting of zoom's buttons</h5>

<p>smOptions.zoomButtons will give you ability to set and customize zoom buttons. For changing and including these elements you can use next parameters:</p>

<p>smOptions.zoomButtons.inButton - set user's image for "Zoom In" buttom's template. Format: string URL-link to element.</p>

<p>smOptions.zoomButtons.inText - set popup text for hover "Zoom In" button. Format: string.</p>

<p>smOptions.zoomButtons.inStyle - set user's styles for "Zoom In" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'.</p>

<p>smOptions.zoomButtons.inPosition - set position on map for "Zoom In" button. Format: object, for example,  {top: 250, left: 10}.</p>

<p>smOptions.zoomButtons.outButton - set user's image for "Zoom In" buttom's template. Format: string with URL-link to element.</p>

<p>smOptions.zoomButtons.outText - set popup text for hover "Zoom Out" button. Format: string.</p>

<p>smOptions.zoomButtons.outStyle - set user's styles for "Zoom Out" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'.</p>

<p>smOptions.zoomButtons.outPosition - set position on map for "Zoom Out" button. Format: object, for example,  {top: 250, left: 10}.</p>

<h5>2.2.1. Setting of locations's button</h5>

<p>smOptions.geolocation will give you ability to set and customize "Geolocation" button. For changing and including these elements you can use next parameters:</p>

<p>smOptions.geolocation.geoButton - set user's image for "Geolocation" buttom's template. Format: string URL-link to element.</p>

<p>smOptions.geolocation.geoText - set popup text for hover "Geolocation" button. Format: string, for example,</p>

<p>smOptions.geolocation.geoStyle - set user's styles for "Geolocation" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'.</p>

<p>smOptions.geolocation.geoPosition - set position on map for "Geolocation" button. Format: object, for example,  {top: 250, left: 10}.</p>

<p>smOptions.geolocation.icon - set "Geolocation" point's template. Format: string URL-link to element.</p>

<p>smOptions.geolocation.sizePoint - set "Geolocation" point's size. Format: array with poins's width and height, for example, [47, 52].</p>

<p>smOptions.geolocation.offsetPoint -  - set "Geolocation" point's offset. Format: array with poins's offsets for width and height, for example, [-24, -52].</p>
