1- 	taustoitettiin taustat
2	selitetään mikä on javascript, ja miksi se on yv.
3	javascript serverissä
4 	Microsoftin työntekijä, joka käyttää MäccOS:ssää - selittää asennusohjeet jotta voin "--kävellä Javascriptin kanssa." Suosittelee VSC:tä, sillä se mm. kävelee Windowsin, MäcOS:n ja Linuxin kanssa. Siihen laajennuksia: ESLint [korjaa virheitä], Prettier [formatoi koodin siistiksi], JavaScript (ES6) code snippets [pikavalitsee useimmin käytetyt koodit]. Node.js [https://nodejs.org] execute javascript code outside of the browser. Windows install: [https://github.com/coreybutler/nvm-windows]
5	Nyt hän antaa asennusohjeet VSC:hen. 
6 	3 string tyyppiä, joilla korvataan tekstipätkiä
7	kommenttien käyttöohje. Neuvoo olemaan käyttämättä kommentteja. //current line , /* */ , 
8	single-line comments multilinecomments //current line , /* */ . Make your code self-commenting. 
9	var variable keyword, vanhentunut ja huonompi kuin let tai const. let only inside { }. let only usable from their line onwards. const eli constant value, jonka voi asettaa vain kerran, mutta se on hyödyllinen, jos on vain jotain yhtä variablea.
10 	var variable keyword, vanhentunut ja huonompi kuin let tai const. let only inside { }. let only usable from their line onwards. const eli constant value, jonka voi asettaa vain kerran, mutta se on hyödyllinen, jos on vain jotain yhtä variablea.
11 	It's always best to keep everything the same datatype. string 1 anbd string 2 how to add spacing inbetween. be careful when trying to use the plus operator with numbers and strings. 
12	Selitti miten työskennellään stringien kanssa.
13	Stringformatting concatenation operator+ needs single or double quotes, line breaks with newline character, must concatenate variable values.
14	working through template literals. (`insertoidaan sanoja ${str1}`);
15 	Data Types in JavaScript: Number (float), String, Boolean, Date, Function, Array and Object. NotANumber, null, undefined. Checking type: typeof operator, instanceof operator. Tyyppitestauksessa käytettävä ===
16	data types. instance of array, number, string, boolean, object, function
17	math javascriptissä. 
18 	esimerkki matikan käytöstä javascriptissä
19	stringien muuttaminen numeroiksi. parseint() & parsefloat()
20	stringien muuttaminen numeroiksi. template literals converting numbers to strings, toString()
21 	Virheistä tietoa. handling errors with try:block of code that may throw an exception/catch:block of code that will run if an exception is thrown/finally:optional enclosed part of code that will run after the try block or after the catch block runs every time, even if an exception is not thrown. 
22	Error handling. try/catch/finally. käytännön esimerkkivideo
23	Päivämäärät javascriptissä creating a date object. setting values.
24	demo dateista. Esittelee sitä siis.
25	boolean logic and if statements. Comparing values in JavaScript: < <= > >= . == === . !== not equal. 
26	demo boolean logic with if statements. === käytä tätä.  
27 	boolean logic with switch aND other syntax. switch (status). break is required, or it will perform silent fallthrough. 
28	demo boolean logic with switch aND other syntax in javascript. avoid negative it can lead to more convoluted code. Case sensitive toUpperCase() ===.
29	array esittely. arrayssä on valueita joille annetaan index numerointi. 
30 	demo creating arrays. 
31 	populating arrays. be mindful of to not overwrite index in arrays. 
32	demo populating arrays. adding data into arrays. 
33	array methods. push and pop affects end of array. shift and unshift affects front of array. concat
34	demo array methods. siitä niiden järjestyksestä, miten ne vaikuttavat 
35	loops in javascript. while loop, for loop & for ... of loop. for loop executes for x number of times. while great for helper function. for loop known number of times. lastly for .. of perfect if array or collection.
36	demo loops looping in realtime in action. 
37	javascript functions. Basics, Syntax, Naming, Parameters & Return. functions are basic blocks of code that executes a routine task using a series of instructions. function usage.
38	demo functions. You can use numbers, alphabets underscore and dollar signs everything else not functioning. 
39	Arrow and anonymous function. Fat arrow functions => . 
40	demo Arrows and anonymous function. How to use Fat arrow function => . const add = (a, b) => a + b; console.log(add1, 2)); . output is 3 . subtract squiggly brackets to create a block.
41	object notation. What is JSON. JSON Format. Stringify: Serialize object to JSON. Parse: Deserialize JSON to Object. language independent format. 
42	demo object notation. JavaScript Object Notation json.parse .stringify .   
43 	objects in javascript. Representations of real world objects using code. objects have properties: title, author, isAvailable. JS objects have methods. 
44	demo objects in javascript. define simple object in javascript. methods are just special properties. dot notation gives access value. brackets notation names are the keys.
45	promises for long running operations. Asynchronous programming and promises. modern applications utilize single threads. Takes long. callback selitys. Promises=cleaner version of callbacks. Long running operations typically return a promise. 
46	demo promises for long running operations. take what was built for callbacks and convert into something that could be used with promises. resolve, reject functions inside setTimeout(). 
47	async/wait for managing promises. it will make asynchronous code look synchronous. While promises are cleaner, they are not perfect and can add bloat to code. async/wait is standard in many languages & syntax closer to synchronous code. 
48	demo async/wait for managing promises. Async/Await miten voidaan käyttää hyväksi javascriptissä manageroimaan asynchronous calls. start stop await. Quite often async await tarvitaan.
49	package management. packet is a reusable bundle of code and/or assets. Can be: Libraries, Tools, Shared Components, Your app. Packages are also called dependencies or modules. NPM software registry. app.get . app.listen . Enhances your work. package.json: Metadata; project name, version, description, author, repository, license, etc., Dependencies; the list of packages used by your project, Scripts; commands to automate your development tasks. npm init . npm install <package_name> .  dependencies vs devDependencies.
50	demo package management. npm init -y. Opettaa npm installaatiot packageille. NPM SCRIPTS vasemmalla alhaalla. 
51	kiitosvideo / mainosvideo.
