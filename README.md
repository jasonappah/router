# router
Serves my website and acts as a URL shortener

This is currently deployed on Vercel and the links are stored in an Airtable base. This does have the unintended side effect of my links not working when Airtable goes down, so I need to think of a solution to that, but I'm not really interested in using an *actual* database and then having to make some sort of UI to manage links, so it will stay as is for now. 

Here's my Airtable base: [https://airtable.com/shrJNnm6FZJgwBEev](https://airtable.com/shrJNnm6FZJgwBEev)

Try it at [jasonaa.me](https://jasonaa.me) and [jasonaa.me/github!](https://jasonaa.me/github)

To deploy this on Vercel, just click this button! Make sure you set these environmental variables! ```AIRTABLE_API_KEY, AIRTABLE_BASE_ID, DEFAULT_URL```

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/jasonappah/router)

You'll probably need to make some changes in ```vercel.json```. Here's a sample ```vercel.json```. These are the 2 required routes, but you can add more. Don't delete these, as they are required to make the app work, but you can edit the ```/``` route to go to the URL of your actual site.
```
{
    "routes": [
        { "src": "/", "dest": "https://wherever.yoursite.is/" },
        { "src": "/(.*)", "dest": "/api/main?redir=$1" }
    ]
}
```
