<h1>StagiMap</h1>

<p>StagiMap is a simple friendly Yandex.Maps's configurator. Mission of that library is to give any developer without needed experience simple ways of customizing and setting of maps for different projects. Just with few rows you can build your own functional map.</p>

<p>This library was not created for flexible setting. This project include the most popular Yandex.Maps' abilities and provide you new experience of work with it.</p>

<p>Documentation and demo in Russian: <a href="http://makstakeda.ru/stagimap" target="_blank">makstakeda.ru/stagimap</a></p>

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

<p>You need to download library and include that JS-file to your page. Also you must choose language of map's localization in RFC-3066 format (Get Information about supported localizations on <a href="https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/" target="_blank">tech.yandex.com/maps/doc/intro/concepts/localization-docpage</a>). You don't need to include basic library of Yandex.Maps - this library are included in StagiMap. For example,</p>

<pre><script src=".../stagimap.js?lang=en"></script></pre>

<p>Map will be initialize in DIV with id="stagimap" with setted width and height.</p>

<h3>2. Map's settings</h3>

<p>For map's customizing and setting you need to use simple JS-object with name "smOptions". You can include this object to any part of your code at page. If you didn't choose any option - library will use default options for map's building.</p>

<h4>2.2. Setting of main parameters</h4>

<p>Main parameters include geographical coordinates of map's center, working area, minimum, maximum and initial zoom:</p>

<table>
<tr>
<td>smOptions.center</td>
<td>set geographical coordinates of map's center. Format: array with latitude and longitude, for example, [34.4481, -119.2429]</td>
</tr>

<tr>
<td>smOptions.restrictArea</td>
<td>set working area with restricted borders. Format: multidimensional array with coordinates of left-top border point and right-bottom border point, for example, [[60.055334,30.038404], [59.812399,30.484037]]</td>
</tr>

<tr>
<td>smOptions.initialZoom</td>
<td>set initial zoom. Format: number between 1 and 16</td>
</tr>

<tr>
<td>smOptions.maxZoom</td>
<td>set maximum zoom. Format: number between 1 and 16</td>
</tr>

<tr>
<td>smOptions.minZoom</td>
<td>set minimum zoom. Format:  number between 1 and 16</td>
</tr>
</table>

<h4>2.2. Setting of controlling buttons</h4>

<p>At this moment moment library provide ability to work with zoom's buttons and location's button.</p>

<h5>2.2.1. Setting of zoom's buttons</h5>

<p>smOptions.zoomButtons will give you ability to set and customize zoom buttons. For changing and including these elements you can use next parameters:</p>

<table>
<tr>
<td>smOptions.zoomButtons.inButton</td>
<td>set user's image for "Zoom In" buttom's template. Format: string URL-link to element</td>
</tr>

<tr>
<td>smOptions.zoomButtons.inText</td>
<td>set popup text for hover "Zoom In" button. Format: string</td>
</tr>

<tr>
<td>smOptions.zoomButtons.inStyle</td>
<td>set user's styles for "Zoom In" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'</td>
</tr>

<tr>
<td>smOptions.zoomButtons.inPosition</td>
<td>set position on map for "Zoom In" button. Format: object, for example,  {top: 250, left: 10}</td>
</tr>

<tr>
<td>smOptions.zoomButtons.outButton</td>
<td>set user's image for "Zoom In" buttom's template. Format: string with URL-link to element</td>
</tr>

<tr>
<td>smOptions.zoomButtons.outText</td>
<td>set popup text for hover "Zoom Out" button. Format: string</td>
</tr>

<tr>
<td>smOptions.zoomButtons.outStyle</td>
<td>set user's styles for "Zoom Out" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'</td>
</tr>

<tr>
<td>smOptions.zoomButtons.outPosition</td>
<td>set position on map for "Zoom Out" button. Format: object, for example,  {top: 250, left: 10}</td>
</tr>
</table>

<h5>2.2.1. Setting of locations's button</h5>

<p>smOptions.geolocation will give you ability to set and customize "Geolocation" button. For changing and including these elements you can use next parameters:</p>

<table>
<tr>
<td>smOptions.geolocation.geoButton</td>
<td>set user's image for "Geolocation" buttom's template. Format: string URL-link to element</td>
</tr>

<tr>
<td>smOptions.geolocation.geoText</td>
<td>set popup text for hover "Geolocation" button. Format: string</td>
</tr>

<tr>
<td>smOptions.geolocation.geoStyle</td>
<td>set user's styles for "Geolocation" buttons's template. Format: string, for example, 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'</td>
</tr>

<tr>
<td>smOptions.geolocation.geoPosition</td>
<td>set position on map for "Geolocation" button. Format: object, for example,  {top: 250, left: 10}</td>
</tr>

<tr>
<td>smOptions.geolocation.icon</td>
<td>set "Geolocation" point's template. Format: string URL-link to element</td>
</tr>

<tr>
<td>smOptions.geolocation.sizePoint</td>
<td>set "Geolocation" point's size. Format: array with poins's width and height, for example, [47, 52]</td>
</tr>

<tr>
<td>smOptions.geolocation.offsetPoint</td>
<td>set "Geolocation" point's offset. Format: array with poins's offsets for width and height, for example, [-24, -52]</td>
</tr>
</table>

<h4>2.3. Setting of map's points</h4>

<h5>2.3.1.  Clustering</h5>

<table>
<tr>
<td>smOptions.cluster</td>
<td>make possible to unite point in clusters. Format: boolean</td>
</tr>
</table>

<h5>2.3.1.  Point's adding</h5>

<p>smOptions.data will add objects' array to map. Every array's object can have next parameters for presenting of point and baloon:</p>

<table>
<tr>
<td>smOptions.data[i].coordinates</td>
<td>set geographical coordinates of point's center. Format: array with latitude and longitude, for example, [34.4481, -119.2429]</td>
</tr>

<tr>
<td>smOptions.data[i].html</td>
<td>text or HTML for point's baloon. Format: string</td>
</tr>

<tr>
<td>smOptions.data[i].title</td>
<td>text or HTML for point's baloon. Format: string</td>
</tr>

<tr>
<td>smOptions.data[i].icon</td>
<td>set point's template. Format: string URL-link to element</td>
</tr>

<tr>
<td>smOptions.data[i].sizePoint</td>
<td>set point's size. Format: array with poins's width and height, for example, [47, 52]</td>
</tr>

<tr>
<td>smOptions.data[i].offsetPoint</td>
<td>set point's offset. Format: array with poins's offsets for width and height, for example, [-24, -52]</td>
</tr>

<tr>
<td>smOptions.data[i].group</td>
<td>set group for point if it necessary. Format: string or number</td>
</tr>
</table>

<h4>2.4. Multiroute's building</h4>

<p>smOptions.router will provide settings for multiroute's building from A to B. Format: object with selected parameters:</p>

<table>
<tr>
<td>smOptions.router.startPoint</td>
<td>set start point. Format:  array with latitude and longitude, for example, [34.4481, -119.2429] or string with location's name</td>
</tr>

<tr>
<td>smOptions.router.endPoint</td>
<td>set end point. Format:  array with latitude and longitude, for example, [34.4481, -119.2429] or string with location's name</td>
</tr>

<tr>
<td>smOptions.router.maxWays</td>
<td>maximum available number of ways from A to B. Format: number</td>
</tr>

<tr>
<td>smOptions.router.refPoints</td>
<td>set transit points on current route. Format: multidimensional array with points' coordinates, for example, [[37.771951, -116.637113], [39.102605, -119.735258]]</td>
</tr>
</table>

<h4>2.5. Road traffic</h4>

<p>There is a mode with current road situation for  places in Russia, Belarus, Kazakhstan and Turkey.</p>

<table>
<tr>
<td>smOptions.traffic</td>
<td>turn on (or off) layout with current road traffic. Format: boolean</td>
</tr>
</table>

<h4>3. Integration with HTML</h4>

<p>Every link can have additional attributes for simple work with map's actions and map's using.</p>

<p>sm-point - attribute for map's moving to choosen point from smOptions.data. Attribute's value is number with item's index in smOptions.data. For example, sm-point="0".</p>

<p>sm-move - attribute for map's moving to choosen map's coordinates.  Attribute's value is geographic coordinates (latitude and longitude). For example, sm-move="0, 0".</p>

<p>sm-show - attribute for setting of group's visibility. It's show and hide choosen group of points by click. Group's name is parameter from smOptions.data[i].group for current point (points). If attribute don't have any value link's click will show all points from smOptions.data.</p>
