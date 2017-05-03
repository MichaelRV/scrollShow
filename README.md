# scrollShow

#### [LIVE DEMO](#)

## Version

1.0

## Basic usage

- HTML

```html
<section class="scrollShow">
  <div class="item-show"></div>
</section>
```

- JavaScript

```javascript
$('.scrollShow').scrollShow({
  items: '.item-show'
});
```

## Options (defaults)

```javascript
$('.scrollShow').scrollShow({
  children: null,
  activeClass: 'show',
  offset: 0
});
```