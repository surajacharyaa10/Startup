import { Blog } from "../components/BlogCard";

export const mockBlogs: Blog[] = [
    {
        _id: "69398f5716798b7ede797d06",
        title: "Using React Server Components and Server Actions in Next.js",
        content: `
## Introduction: Enhancing Next.js with React Server Components

Next.js has evolved to include powerful features like React Server Components and Server Actions, providing a more efficient and streamlined approach to building web applications.

## What Are React Server Components?

React Server Components (RSC) are a new type of component introduced by React that allows you to render components on the server. This approach helps reduce the amount of JavaScript sent to the client and enhances performance by offloading rendering work to the server.

## Benefits of React Server Components

- **Improved Performance:** By rendering on the server, you reduce the amount of client-side JavaScript and improve load times.
- **Enhanced User Experience:** Faster initial page loads and smoother interactions.
- **Simplified Data Fetching:** Fetch data on the server and pass it directly to components.

## Example: Creating a Server Component

Here’s a basic example of a React Server Component in a Next.js application:

\`\`\`javascript
// app/components/UserProfile.server.js
import { getUserData } from "../lib/api";

export default async function UserProfile() {
  const user = await getUserData();
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

In this example, \`UserProfile\` is a server component that fetches user data on the server and renders it.

## What Are Server Actions?

Server Actions are functions that run on the server in response to user interactions or other events. They allow you to handle server-side logic, such as form submissions or API requests, directly from your React components.

## Benefits of Server Actions

- **Simplified Server Logic:** Write server-side code directly in your components.
- **Enhanced Security:** Handle sensitive operations on the server rather than the client.
- **Improved Performance:** Reduce client-side JavaScript and offload tasks to the server.

## Example: Using Server Actions

Here’s how you can use Server Actions in a Next.js application to handle form submissions:

\`\`\`javascript
// app/actions/submitForm.js
import { saveFormData } from "../lib/api";

export async function submitForm(data) {
  await saveFormData(data);
  return { success: true };
}
\`\`\`

\`\`\`javascript
// app/components/ContactForm.js
"use client";
import { submitForm } from "../actions/submitForm";

export default function ContactForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await submitForm(Object.fromEntries(formData));
    if (result.success) {
      alert("Form submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`
`,
        image:
            "https://res.cloudinary.com/dx0f7h4at/image/upload/v1765379926/startupBackend/blogs/lcsrmkqnoprhh7o2jdaw.jpg",
        slug: "react-server-components-js-1765379918478",
        tags: ["Next.js", "React", "Server Components"],
        category: "Development",
        readTime: "5 min read",
        views: 2,
        createdAt: "2025-12-10T15:18:47.661Z",
        author: "Suraj Acharya",
    },
    {
        _id: "69399187a9a1c3915c0718f2",
        title: "Complex Content Test",
        content: `
## Introduction: Enhancing Next.js with React Server Components

Next.js has evolved to include powerful features like React Server Components and Server Actions, providing a more efficient and streamlined approach to building web applications.

## What Are React Server Components?

React Server Components (RSC) are a new type of component introduced by React that allows you to render components on the server. This approach helps reduce the amount of JavaScript sent to the client and enhances performance by offloading rendering work to the server.

## Benefits of React Server Components

- **Improved Performance:** By rendering on the server, you reduce the amount of client-side JavaScript and improve load times.
- **Enhanced User Experience:** Faster initial page loads and smoother interactions.
- **Simplified Data Fetching:** Fetch data on the server and pass it directly to components.

## Example: Creating a Server Component

Here’s a basic example of a React Server Component in a Next.js application:

\`\`\`javascript
// app/components/UserProfile.server.js
import { getUserData } from "../lib/api";

export default async function UserProfile() {
  const user = await getUserData();
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## What Are Server Actions?

Server Actions are functions that run on the server, allowing you to handle form submissions and data mutations directly from your components.

## Example: Using Server Actions

\`\`\`javascript
// app/actions/submitForm.js
import { saveFormData } from "../lib/api";

export async function submitForm(data) {
  await saveFormData(data);
  return { success: true };
}
\`\`\`
`,
        image:
            "https://res.cloudinary.com/dx0f7h4at/image/upload/v1765380486/startupBackend/blogs/xpjosqd8l1zblftxhins.jpg",
        slug: "complex-content-test-1765380481888",
        tags: ["Next.js", "React", "Server Components"],
        category: "Development",
        readTime: "5 min read",
        views: 0,
        type: "standard",
        createdAt: "2025-12-10T15:28:07.287Z",
        author: "Suraj Acharya",
    },
];
