import * as React from "react"

import Layout from "../components/layout"

const AboutPage = () => (
    <Layout pageTitle="About Me">
        <h1>About Me</h1>
        <p>
            Hi there! I'm a software developer based in <i><a href="https://goo.gl/maps/dDUwS3yW2rxizpD19">Lille</a></i>, France.
        </p><p>
            I am currently employed by the company <i>Arobas Music</i> where I participate in the development of the <i><a href="https://www.guitar-pro.com">Guitar Pro</a></i> application.
        </p><p>
            My main hobby is coding.
        </p><p>
            I love creating web applications and I'm always looking for new things to learn to improve my knowledge and skills.
        </p><p>
            You will find on my site, some of creations.
        </p><p>
            My favorite languages are (in alphabetical order):
        </p><ul>
            <li>C++,</li>
            <li>Python,</li>
            <li>Typescript.</li>
        </ul><p>
            I also enjoy photography, 2D video games, electronic music and forest walks with my dog.
        </p>
    </Layout>
)

export default AboutPage