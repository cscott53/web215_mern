export default function Footer() {
  return (
    <footer>
      <span class="links"><a href="https://github.com/cscott53">Github</a></span>
      <span class="links"><a href="https://cscott53.github.io/">Github.io</a></span>
      <span class="links"><a href="https://cscott53.github.io/web215/">WEB215.io</a></span>
      <span class="links"><a href="https://www.freecodecamp.org/cscott53">freeCodeCamp</a></span>
      <span class="links"><a href="https://www.codecademy.com/profiles/method4794308211">Codecademy</a></span>
      <span class="links"><a href="https://jsfiddle.net/user/cscott53">JSFiddle</a></span>
      <span class="links"><a href="https://www.linkedin.com/in/charles-scott-545b4228a/">Linkedin</a></span>
      <br/>
      <br/>
      <em>MindMingle: Connect, create, collaborate</em>
      <br/>
      <p>Page built by Scripts Galore</p>
      <a href={`https://validator.w3.org/check?uri=${location.href}`}><img src="/validate_html.png" className="validate" alt="Validate HTML"/></a>
      <a href={`https://jigsaw.w3.org/css-validator/check/${location.href}`}><img src="/validate_css.png" className="validate" alt="Validate CSS"/></a>
    </footer>
  )
}
