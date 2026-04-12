---
permalink: /assets/js/search-data.js
---
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the posts menu items
ninja.data = [
  {%- if site.posts_in_search -%}
    {%- for post in site.posts -%}
      {
        {%- assign title = post.title | escape | strip -%}
        id: "post-{{ title | slugify }}",
        {% if post.redirect == blank %}
          title: "{{ title | truncatewords: 13 }}",
        {% elsif post.redirect contains '://' %}
          title: '{{ title | truncatewords: 13 }} <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        {% else %}
          title: "{{ title | truncatewords: 13 }}",
        {% endif %}
        description: "{{ post.description | strip_html | strip_newlines | escape | strip }}",
        section: "Posts",
        handler: () => {
          {% if post.redirect == blank %}
            window.location.href = "{{ post.url | relative_url }}";
          {% elsif post.redirect contains '://' %}
            window.open("{{ post.redirect }}", "_blank");
          {% else %}
            window.location.href = "{{ post.redirect | relative_url }}";
          {% endif %}
        },
      },
    {%- endfor -%}
  {%- endif -%}
];
