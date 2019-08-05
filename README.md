# Svelte template
### by Peter Lyubenov 

## Custom API

### router.js

When you `import Router from "./router.js` you can use the page router which can take the current path and return a page which matches it. To add pages to it you first have to create a "page" object like this
```javascript
let page = {
    text = "Blog",
    link = "/blog",
    slug = "blog",
    path = /^\/blog(?:\/(\d+)?\/?)?$/ // Example matches: /blog   /blog/   /blog/4   /blog/4/
}
```
Then you add it to the router

```javascript
let router = new Router();
router.add(page);
```

When you want to find out which page you're on and get all parameters defined by regex you can use
```javascript
let currentPage = router.get();
console.log(currentPage.slug); //blog - if you're on localhost:5000/blog/
console.log(currentPage.args[0]) // 4  - if you're on localhost:5000/blog/4
```

### Navbar

I provide a complete, fully responsive navbar in two parts - the `Navbar.svelte` and the `NavItem.svelte`. You only need to import `Navbar.svelte`. To create a navbar do 
```javascript
    import Navbar from "./Navbar.svelte";

    //Define all the pages for the navbar
    let pages = [
        {text: "Начало", link: "/"},
        {text: "За нас", link: "/about"},
        {text: "Портфолио", link: "/portfolio"},
        {text: "Контакти", link: "/contact"}
    ];
```
```xml
    <Navbar fixed pages={pages} theme="light" />
```
#### Parameters
The only required parameter here is the `pages` which takes an array of objects, containing at least a `text` and `link` properties. 

##### fixed
`fixed` is a boolean parameter. When true, it adds the `fixed` css property to the navbar, so it moves with the screen.
It's `false` by default
##### theme
`theme` can either be either `"light"` or `"dark"` and changes, well, the theme of the navbar. 
By default it is set to `"dark"`

##### Logo
There are three logo parameters that you can use to manipulate the logo that is displayed on the navbar. At the moment it has to be an image, but you can modify the component to display text, its simple HTML.
`logo` is the path to the logo image. By default it leads to `/assets/img/logo.png`; 
`logo_alt` is the alt text for the image. By default it is set to `"Logo"` so you should probably change that for SEO
`logo_href` - the href of the `<a>` element that is surrounding the picture. By default it leads to `/`

If you want to modify any of the colors, you can do so from the components' pages. The color rules are brought to the top of the `<style>` tag for convenience. 