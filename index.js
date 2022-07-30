const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([{title, author, lines}]) => {poem = []
  poemTitle = makeTag(`h2`)(title)
  authorName = pipe(makeTag(`em`), makeTag(`h3`))(`by ${author}`)
  stanza = []
  lines.forEach((text, index) => {
    if(!text){
      poem.push(stanza)
      stanza = []
    }else if(index === lines.length - 1){
      stanza.push(text)
      poem.push(stanza)
    }else{
      stanza.push(text)
    }
  })
  group = ``
  poem.forEach((stanza) => {group += makeTag(`p`)(stanza.join(`<br>`))})
  return `${poemTitle}${authorName}${group}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
