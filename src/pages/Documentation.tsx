import { PRIMARY800 } from "../theme/colors";

export default function Documentation(){
    return(
        <div className="w-full h-full flex flex-row items-start justify-end box-border overflow-x-hidden">
            <div className="left-0 fixed px-8 pt-4 w-[30%] h-full box-border border border-black">
                <div className="mt-2 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Overview</div>
                <div className="mt-3 text-sm">Team Members</div>
                <div className="mt-3 text-sm">Introduction</div>
                <div className="mt-3 text-sm">Project Objectives</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
                <div className="mt-3 text-sm">Project Name</div>
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
                </div>
            </div>
        </div>
    );
}