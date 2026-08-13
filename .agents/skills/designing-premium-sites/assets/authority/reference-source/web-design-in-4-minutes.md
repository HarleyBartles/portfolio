Let's say you have a product, a portfolio, or just an idea you want to share with everyone on your *own* website. Before you publish it on the internet, you want to make it look attractive, professional, or at least *decent* to look at.

What is the [first thing](#content) you need to work on?

## Content

The purpose of **design** is to enhance the presentation of the content it's applied to. It might sound obvious, but content being the **primary** element of a website, it should not be established as an afterthought.

Written content, like the paragraph you're currently reading, makes up for more than 90% of the Web. Styling this textual content will go a long way.

Let's assume you've already finalised the content you want to publish and just created an empty `style.css` file, what is the [first rule](#centering) you can write?

## Centering

Long lines of text can be hard to parse, and thus hard to **read**. Setting a limit of characters per line greatly enhances the readability and appeal of a wall of text.

```
body {
  margin: 0 auto;
  max-width: 50em;
}
```

After styling the text *blocks*, what about styling the [text itself](#font-family)?

## Font family

The browser's font defaults to `"Times"`, which can look unappealing (mostly because it is the "unstyled" font). Switching to a **sans-serif** font like `"Helvetica"` or `"Arial"` can vastly improve the look of your page.

```
body {
  font-family: "Helvetica", "Arial", sans-serif;
}
```

*If you want to stick with a serif font, try `"Georgia"`.*

While this makes the text more *appealing*, let's also make it [more readable](#spacing).

## Spacing

When a page looks "broken" to a user, it's usually a **spacing** issue. Providing space both *around* and *within* your content can increase the appeal of your page.

```
body {
  line-height: 1.5;
  padding: 4em 1em;
}

h2 {
  margin-top: 1em;
  padding-top: 1em;
}
```

While the layout has greatly improved so far, let's apply more [subtle changes](#color-and-contrast).

## Color and contrast

Black text on a white background can be harsh on the eyes. Opting for a softer shade of black for body text makes the page more **comfortable** to read.

```
body {
  color: #555;
}
```

And in order to keep a decent level of **contrast**, let's pick a darker shade for **important** words

```
h1,
h2,
strong {
  color: #333;
}
```

While most of the page has been improved visually, some elements (like the code snippets) still seem [out of place](#balance).

## Balance

It only takes a few additional touches to correct the balance of the page:

```
code,
pre {
  background: #eee;
}

code {
  padding: 2px 4px;
  vertical-align: text-bottom;
}

pre {
  padding: 1em;
}
```

At this point, you might want to make your page stand out and give it [identity](#primary-color).

## Primary color

Most brands have a **primary color** that acts as a visual accent. On a website, this accent can be used to provide emphasis on interactive elements, like **links**.

```
a {
  color: #e81c4f;
}
```

But to keep the balance, we will need some [additional colors](#secondary-colors).

## Secondary colors

The accent color can be complemented with more *subtle* shades, to be used on borders, backgrounds, or even the body text.

```
body {
  color: #566b78;
}

code,
pre {
  background: #f5f7f9;
  border-bottom: 1px solid #d8dee9;
  color: #a7adba;
}

pre {
  border-left: 2px solid #69c;
}
```

Having changed the shades, why not change the [shapes](#custom-font)...

## Custom font

Since text is the main content of a webpage, using a **custom font** gives the page even more noticeable identity.

While you can embed your own webfont or use an online service like [Typekit](https://typekit.com), let's use `"Roboto"` from the free [Google Fonts](https://fonts.google.com) service:

```
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';

body {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
```

After enhancing your identity through *text*, how about adding a [thousand words](#images)...

## Images

Graphics and icons can be used either as ornaments to support your content, or actively take part in the message you want to convey.

Let's enhance our header with a nice **background image** from [Unsplash](https://unsplash.com/photos/qH36EgNjPJY)

```
header {
  background-color: #263d36;
  background-image: url("header.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 1.2;
  padding: 10vw 2em;
  text-align: center;
}
```

Let's also add a **logo**

```
header img {
  display: inline-block;
  height: 120px;
  vertical-align: top;
  width: 120px;
}
```

Let's take that opportunity to enhance the text styles.

```
header h1 {
  color: white;
  font-size: 2.5em;
  font-weight: 300;
}

header a {
  border: 1px solid #e81c4f;
  border-radius: 290486px;
  color: white;
  font-size: 0.6em;
  letter-spacing: 0.2em;
  padding: 1em 2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: none 200ms ease-out;
  transition-property: color, background;
}

header a:hover {
  background:  #e81c4f;
  color: white;
}
```

And voilà!

We've designed a decent page in just a few minutes, following basic principles of web design. 