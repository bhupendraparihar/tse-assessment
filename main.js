(async () => {
    async function fetchResumeData() {
        const response = await fetch('./resume-data.json');
        return await response.json();
    }

    const resumeData = await fetchResumeData();

    function createAboutMe(name, linkedin, aboutMe) {

        return `<img src='pic.jpg' class='image'><h1>${name}</h1>
                <a href="${linkedin}">${linkedin}</a>
                <section id="aboutme">
                    <h1>About Me</h1>
                    <p data-content="aboutme">${aboutMe}</p>
                </section>`;
    }

    function createEducation(education) {
        const educationItems = education.reduce((pv, item) => {
            return pv + `<li>
                    <section>
                        <ul>
                            <li>
                                <div class="label">School:</div>
                                <div class="content">${item.school}</div>
                            </li>
                            <li>
                                <div class="label">Program:</div>
                                <div class="content">${item.program}</div>
                            </li>
                            <li>
                                <div class="label">Dates Attended:</div>
                                <div class="content">${item.startDate} - ${item.endDate}</div>
                            </li>
                            <li>
                                <div class="label">Achievements:</div>
                                <div class="content">${item.achievements}</div>
                            </li>
                        </ul>
                    </section>
                </li>`;
        }, '');

        return `<section id="education">
                <h1>Education</h1>
                <ul data-content="education">
                    ${educationItems}
                </ul></section>`;

    }

    function createProjects(projects) {
        const projectList = projects.reduce(function (pv, project) {
            return pv + `<li>
                <section>
                    <ul>
                        <li>
                            <div class="label">Name:</div>
                            <div class="content">${project.title}</div>
                        </li>
                        <li ng-show="project.link">
                            <div class="label">URL:</div>
                            <div class="content"><a href="${project.link}">${project.link}</a></div>
                        </li>
                        <li>
                            <div class="label">Description:</div>
                            <div class="content">${project.description}</div>
                        </li>
                    </ul>
                </section>
            </li>`;
        }, '');

        return `<section id="projects">
                <h1>Projects</h1>
                <ul data-content="projects"> 
                    ${projectList} 
                </ul>
            </section>`;
    }

    function createAchievements(achievements) {
        const achievementItems = achievements.reduce((pv, achievement) => {
            return pv + `<li>${achievement}</li>`;
        }, '');

        return `<section id="achievemnts">
            <h1>Achievements</h1>
            <ul>
                ${achievementItems}
            </ul>
            </section>`;
    }

    const section = document.createElement('section');
    section.id = 'container';
    section.innerHTML = createAboutMe(resumeData.name, resumeData.linkedin, resumeData.aboutme)
        + createEducation(resumeData.education)
        + createProjects(resumeData.personalProjects)
        + createAchievements(resumeData.achievements);

    document.body.appendChild(section);
})();
