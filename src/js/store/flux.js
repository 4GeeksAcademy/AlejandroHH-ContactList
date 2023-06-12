const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			foto: [
				
			],
			contacts: [

			],

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			loadSrc: async(id) => {
				const response = await fetch(`https://randomuser.me/api/`)
				const data = await response.json()
				console.log(data)
				setStore({foto: data.results[0].picture.medium});
			},
			
			editContact: async (agenda_slug, update) => {
				const putConfig = {
				  method: 'PUT',
				  headers: { 'Content-Type': 'application/json' },
				  body: JSON.stringify(update),
				};
			  
				const resp = await fetch(`https://assets.breatheco.de/apis/fake/contact/${agenda_slug}`, putConfig);
				const data = await resp.json();
			  
				// Actualiza solo el contacto correspondiente en el estado
				const updatedContacts = store.contacts.map((contact) => {
					if (contact.agenda_slug === agenda_slug) { // Corregir aquí
					  return { ...contact, ...update };
					}
					return contact;
				  });
			  
				setStore({ contacts: updatedContacts });
			  },
			  
			  

		}
	};
};

export default getState;
