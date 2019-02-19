import { User } from './user.model';

export class IssuesItem {
    number: number = null;
    url: string = "";
    title: string = "";
    //description: string = "";
    created_at: string = "";
    updated_at: string = "";
    state: string = "";
    comments: number = 0;
    //comments_list: string = "";
    user: User = new User;
}

/*
{
    "url": "https://api.github.com/repos/phonegap/phonegap-plugin-push/issues/2714",
    "repository_url": "https://api.github.com/repos/phonegap/phonegap-plugin-push",
    "labels_url": "https://api.github.com/repos/phonegap/phonegap-plugin-push/issues/2714/labels{/name}",
    "comments_url": "https://api.github.com/repos/phonegap/phonegap-plugin-push/issues/2714/comments",
    "events_url": "https://api.github.com/repos/phonegap/phonegap-plugin-push/issues/2714/events",
    "html_url": "https://github.com/phonegap/phonegap-plugin-push/issues/2714",
    "id": 411188493,
    "node_id": "MDU6SXNzdWU0MTExODg0OTM=",
    "number": 2714,
    "title": "How to handle notifications received when app is shut down?",
    "user": {
      "login": "anagara",
      "id": 3153764,
      "node_id": "MDQ6VXNlcjMxNTM3NjQ=",
      "avatar_url": "https://avatars3.githubusercontent.com/u/3153764?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/anagara",
      "html_url": "https://github.com/anagara",
      "followers_url": "https://api.github.com/users/anagara/followers",
      "following_url": "https://api.github.com/users/anagara/following{/other_user}",
      "gists_url": "https://api.github.com/users/anagara/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/anagara/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/anagara/subscriptions",
      "organizations_url": "https://api.github.com/users/anagara/orgs",
      "repos_url": "https://api.github.com/users/anagara/repos",
      "events_url": "https://api.github.com/users/anagara/events{/privacy}",
      "received_events_url": "https://api.github.com/users/anagara/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [

    ],
    "milestone": null,
    "comments": 0,
    "created_at": "2019-02-17T13:37:35Z",
    "updated_at": "2019-02-17T13:37:35Z",
    "closed_at": null,
    "author_association": "NONE",
    "body": "### Description\r\nThis is not so much an issue but seeking help on best practice to handle a particular use case on iOS platform. Here is the scenario, which I'm sure is not uncommon:\r\n\r\n1. User kills the app (doubleclick home button and swipe up)\r\n\r\n2. Notification arrives and iOS pops up the alert on the home screen.\r\n\r\n3A. If user taps the alert, the app is launched and the \"on notification\" event is triggered. Perfect!\r\n\r\n3B. But if user starts the app by tapping its icon, \"on notification\" event is not triggered. This is expected, so currently my app detects that messages have been missed (by message id synchronization between app and server). It displays an alert to the user to tap in the Notification Center. When user taps in the Notification Center, it just switches the app from background to foreground but does not trigger \"on notification\" event and the missing message is lost. \r\n\r\nI believe this is a \"feature\" not a bug (tapping in notification center not triggering \"on notification\" in background app). So my question is, how do people handle this general use case of handling notifications that arrive when the app is killed?\r\n\r\n### Environment\r\nDevice: iPhone (multiple models) with iOS 12.1.4\r\nCordova 7.1.0\r\nPush Plugin 2.2.3\r\n\r\n### Side notes:\r\nDue to the nature of our application, we have a no log policy of message content on the server.\r\n\r\nI got excited about the force-start property as this would allow a notification payload to wake up dead app, but realized that this is Android only.\r\n\r\nIs force-start capability (lack of) an iOS limitation or plugin implementation limitation?  Try this: kill WhatsApp on your iPhone. Ask someone else to send you a message. You'll find that WhatsApp wakes up and receives the incoming message. Seems that iOS allows force start.\r\n"
  },

  */