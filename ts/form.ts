import type {addDoc, collection, getFirestore} from 'firebase/firestore';

const {db, firestore} = window as unknown as Window & {
    db: ReturnType<typeof getFirestore>
    firestore: {
        addDoc: typeof addDoc,
        collection: typeof collection
    }
}

export function mailTsDev(e: SubmitEvent) {
   const formValues = {
    name: (e.target as any).name.value,
    email: (e.target as any).email.value,
    message: (e.target as any).message.value,
   };

   firestore.addDoc(firestore.collection(db, 'mail'), {
     to: 'info@ts.dev',
     from: formValues.email,
     message: {
        subject: 'TS.DEV inquiry',
        text: `${formValues.message}\n${formValues.name}`
     }
   }).then(
    () => {
        const buttonElement = (e.target as any)[3];
        buttonElement.classList.toggle('sent');
        buttonElement.textContent = '✔️ Sent';
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
            buttonElement.classList.toggle('sent');
            buttonElement.textContent = 'Send';
        }, 3000);
    }
   )  
}