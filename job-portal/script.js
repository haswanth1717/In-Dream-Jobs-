const defaultJobs = [
  { title: 'Frontend Developer', company: 'TCS', location: 'Delhi', type: 'Full-Time' },
  { title: 'Backend Engineer', company: 'Infosys', location: 'Pune', type: 'Remote' },
  { title: 'UI/UX Designer', company: 'Wipro', location: 'Mumbai', type: 'Internship' },
];

function getAllJobs() {
  const stored = JSON.parse(localStorage.getItem('jobs') || '[]');
  return [...defaultJobs, ...stored];
}

function displayJobs(jobList = getAllJobs()) {
  const container = document.getElementById('jobList');
  container.innerHTML = '';

  if (jobList.length === 0) {
    container.innerHTML = '<p>No jobs found.</p>';
    return;
  }

  jobList.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong></p>
      <p>📍 ${job.location} | 💼 ${job.type}</p>
      <button class="apply-btn">Apply Now</button>
    `;
    container.appendChild(div);
  });
}

function filterJobs() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const type = document.getElementById('typeFilter').value;
  const location = document.getElementById('locationFilter').value;

  const filtered = getAllJobs().filter(job =>
    (job.title.toLowerCase().includes(search)) &&
    (type === "" || job.type === type) &&
    (location === "" || job.location === location)
  );

  displayJobs(filtered);
}

// Show Login/Logout
window.onload = () => {
  displayJobs();
  const authLink = document.getElementById('authLink');
  if (localStorage.getItem('loggedInUser')) {
    authLink.innerText = 'Logout';
    authLink.onclick = () => {
      localStorage.removeItem('loggedInUser');
      alert('Logged out!');
      location.reload();
    };
  }
};
