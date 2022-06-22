// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import * as React from "react";
import App from "../src/App"
import { createRoot } from 'react-dom/client';

const container = document.body.appendChild(document.createElement('div'));
const root = createRoot(container!);
root.render(<App />);