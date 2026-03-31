document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('input');
	const addBtn = document.getElementById('add-btn');

	addBtn.addEventListener('click', (e) => {
		e.preventDefault();

		if (input.value.trim()) {

				fetch('/add-user', {
					method: 'POST',
					headers:  { 'Content-Type': 'application/json' },
					body:  JSON.stringify({ name: input.value.trim() })
				}).then(res => {
					input.value = '';
					alert('User was added!');
				})
					.catch(e => console.log(e));

		} else alert('Fill in the name please!');
	})
})