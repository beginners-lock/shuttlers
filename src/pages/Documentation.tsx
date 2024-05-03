import { PRIMARY800 } from "../theme/colors";

export default function Documentation(){
    return(
        <div className="w-full h-full flex flex-row items-start justify-end box-border overflow-x-hidden">
            <div className="left-0 fixed px-8 pt-4 w-[30%] h-full box-border border border-black">
                <div className="mt-2 text-md font-bold">Table of Contents</div>
                <div className="mt-4 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Overview</div>
                <div className="mt-3 text-sm">Team Members</div>
                <div className="mt-3 text-sm">Introduction</div>
                <div className="mt-3 text-sm">Project Objectives</div>
                <div className="mt-3 text-sm">System Architecture</div>
                <div className="mt-3 text-sm">Technologies Used</div>
                <div className="mt-3 text-sm">Features</div>
                <div className="mt-3 text-sm">User Interface Design</div>
                <div className="mt-3 text-sm">Database Schema</div>
                <div className="mt-3 text-sm">Setup Instructions</div>
                <div className="mt-3 text-sm">Conclusion</div>
            </div>
            <div className="w-[70%] px-8 pt-4 pb-8 overflow-y-auto box-border">
                <h1 className="font-bold text-3xl">Documentation</h1>
                <h3 className="text-md mt-2">Welcome to Shuttlers Docs,</h3>
                
                <div className="mt-10">
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>Project Name</div>
                    <div className="flex flex-col items-center justify-start mt-4">
                        <div className="font-bold text-xl" style={{color: PRIMARY800}}>Shuttlers</div>
                        <img className="w-12 mt-4" src="../logo.png"/>
                    </div>
                </div>

                <div className="mt-16"> 
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>Project Overview</div>
                    <div className="mt-4">
                        Shuttlers is a web application designed to streamline transportation within the university environment. 
                        The app aims to provide an efficient and convenient way for students to book rides to various destinations within the campus premises. 
                        Whether it's getting to class, the library, or social events, Shuttlers ensures that students can easily access transportation services right from their smartphones or computers.
                        <br/><br/>
                        By offering a reliable and user-friendly transportation solution, Shuttlers aims to enhance mobility and accessibility on campus, reducing the reliance on personal vehicles and promoting sustainable transportation practices. 
                        Whether it's navigating between classes or attending extracurricular activities, Shuttlers ensures that students can travel safely and conveniently within the university environment.
                    </div>
                </div>

                <div className="mt-16"> 
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>Team Members</div>
                    <div className="mt-4">Madein - <em>UI/UX Designer</em></div>
                    <div className="mt-2">Chukwu Developer - <em>FullStack Developer</em></div>
                </div>

                <div className="mt-16"> 
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>Introduction</div>
                    <div className="mt-4">
                        In the bustling environment of university campuses, efficient transportation is paramount for students to navigate between classes, activities, and various campus facilities. 
                        Recognizing this need, we introduce Shuttlers, a cutting-edge web application poised to revolutionize transportation within the university environment.
                        <br/><br/>
                        Gone are the days of waiting in long queues or struggling to find pick-up. 
                        Shuttlers offers a user-friendly platform where students can effortlessly request rides to their desired destinations within the campus area. 
                        Whether it's a quick trip to class, a visit to the library, or attending extracurricular activities, Shuttlers ensures that students can access transportation services with just a few taps on their devices.
                        Beyond convenience, Shuttlers prioritizes safety and reliability as drivers are properly screened and srutinized by the admin before being accepted as a registered shuttler driver.
                        <br/><br/>
                        In this documentation, we delve into the various aspects of the Shuttlers project, including its objectives, features, system architecture, and deployment strategies. 
                        By harnessing technology to address the transportation needs of students, Shuttlers aims to enhance mobility, accessibility, and overall campus experience. 
                        Welcome to Shuttlers – your gateway to seamless transportation within the university environment.
                    </div>
                </div>

                <div className="mt-16"> 
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>Project Objectives</div>
                    <div className="mt-4">The Shuttlers web app project seeks to achieve the following objectives:</div>
                    <li className="mt-2">To enhance mobility of students within the university environment and provide a platform for punctuality.</li>
                    <li className="mt-2">To offer a user-friendly platform that makes booking rides quick and effortless for students.</li>
                    <li className="mt-2">To have a accessible data and information on registered drivers therefore promoting safety and security.</li>
                    <li className="mt-2">To improve its services based on user feedback and performance metrics.</li>
                    <li className="mt-2">To scale and meet increasing demands as the university community grows and evolves.</li>   
                </div>

                <div className="mt-16"> 
                    <div className="font-bold text-2xl underline" style={{color: PRIMARY800}}>System Architecture</div>
                    <div className="font-bold text-xl mt-4">Client-Side</div>
                    <div className="mt-2">
                    The client-side application comprises the user interface that user interact with and is built on the ReactJS framework using Typescript and TailwindCSS.
                    It consists of the various web pages that are visited like: <em>the authentication pages for signing in and creating an account</em>, <em>a page for changing password when forgotten</em>,
                    <em>pages for depositing to and withdrawing from your shuttlers virtual wallet</em>, <em>a user dashboard page</em>, <em>pages for view available drivers</em>, <em>track their rides</em>, <em>manage their accounts</em>, etc.
                    <br/><br/>
                    
                    This client-side is divided into three possible routes depending on the user who is logging or the current user session. This could either be a driver, a student or an admin.
                    <br/><br/>
                    
                    <strong>The admin</strong> is the user that is in charge of registering and accepting drivers that send a request after filling a form with proof of authenticity. They also have the various 
                    data and shuttler metrics on their dashboard which may inclde <em>total number of shuttle drivers</em>, <em>shuttle rides completed</em>, etc. The admin can also revoke a shuttle driver
                    shuttlers license or privilege.
                    <br/><br/>
                    
                    <strong>The drivers</strong> would have their own distinct UI which would have features such as notification on pending ride orders from student passengers, funds withdrawal while <em>the students</em> UI would have the 
                    ability to book rides and see available drivers.
                    <br/><br/>                    
                    </div>


                    <div className="font-bold text-xl mt-6">Server-Side</div>
                    <div className="mt-2">
                        The server-side application manages the business logic, handles user requests, and interacts with the database and external services. 
                        It manages the authentication process, storing of user data and sensitive information, handling requests from the client side and returning back responses.
                        The server-side of this project is built on NodeJS and ExpressJS majorly using Typescript language.
                        <br/><br/>
                        Responses and requests are exchanged and parsed between client and server in a json format and without the need of keys. 
                        Through asynchronous request handle we ensure to joggle multiple request simultaneously on the server-side thereby reducing communication lag between client and server.
                        Various endpoints and routes are communicated to most times using POST request with the axios library which is a dependency on the client-side.
                    </div>



                    <div className="font-bold text-xl mt-6">Database</div>
                    <div className="mt-2">
                        The database stores all relevant data for the application, including user profiles, ride requests, driver information, and transaction records. 
                        Databases can be RDBMS (relational database management system) such as MySQL, PostgreSQL or SQLite. Sometimes it could be NoSQL databases such
                        as MongoDB. This project uses the MongoDB database to store data and information while using Firebase to store media(Firestore) and for real-time
                        data communication.
                        <br/><br/>
                        It is important to make a good choice for a database as well as setting proper security guidelines because a compromised database puts a lot of user
                        information at risk of compromise. One possible work aroud for this would be the encryption on sensitive user information that is store in the database
                        such as password using methods like 'password hashing'.
                    </div>

                    <div className="font-bold text-xl mt-6">API Layer</div>
                    <div className="mt-2 text-red-700 font-bold">
                        The project made use of majorly two APIs for its functionality. REVISIT LATER.
                    </div>
                </div>
            </div>
        </div>
    );
}