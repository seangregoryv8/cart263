window.onload = () => 
{
    part1();
}

function part1()
{
    headerS("Question 1: Select all paragraph elements in the page")

    // 1.1: Get the body tag
    let bod = document.querySelector("body");
    
    // 1.2: Get its children
    let bodyChildren = bod?.children;

    // 1.3: Turn that HTMLCollection into an array
    let bodyChildrenArray = [].slice.call(bodyChildren)

    console.log(bodyChildrenArray)
    // 1.4: Cycle through the array and respond with every single element inside
    for (let i = 0; i < bodyChildrenArray.length; i++)
        console.log(bodyChildrenArray[i])

    headerS("Question 2: Select only the first paragraph element in the page")
    console.log(bodyChildrenArray[0]);
    console.log(bodyChildrenArray[0].innerHTML)

    headerS("Question 3: Select all elements with the class inner-container")
    let innerContainer = document.getElementsByClassName("inner-container");
    console.log(innerContainer);
    
    headerS("Question 4: Select the last image element inside the element that has the class img-container in the page")

    // 4.1: There exists a way to get both tag and class name.
    let imgContainer = document.querySelectorAll("img.img-container");
    
    // 4.2: Only give out the last element of that specific array
    let q4Image = imgContainer[imgContainer.length - 1];
    console.log(q4Image);

    headerS("Question 5A: Select all h2 elements")
    let allH2Headers = document.getElementsByTagName("h2");
    console.log(allH2Headers);
    headerS("Question 5B: Select length of list in 5A")
    console.log(allH2Headers.length);
    headerS("Question 5C: Select the text content of the first element in the list from 5A")
    console.log(allH2Headers[0].innerHTML)
}

/**
 * 
 * @param {string} text 
 */
function headerS(text)
{
    console.log("\n\n\n\n\n")
    console.log(text);
}