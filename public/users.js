document.addEventListener('DOMContentLoaded', async () => {
	const userList = document.getElementById('user-list');
	fetch('/users')
		.then(res => res.json())
		.then(users => {
			users.forEach(user => {
				userList.innerHTML += `<li><a href="/greet?name=${user.name}">${user.name}</a></li>`;

			})
		})
		.catch(e => console.log(e));

})