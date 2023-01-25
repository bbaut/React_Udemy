import { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({patients, setPatients, patient, setPatient}) => {

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const[error, setError] = useState(false);

  useEffect(() => {
      if (Object.keys(patient).length > 0) {

        setName(patient.name)
        setOwner(patient.owner)
        setEmail(patient.email)
        setDate(patient.date)
        setSymptoms(patient.symptoms)
      }
  }, [patient])



  const generateID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Form validation

    if([name, owner, email, date, symptoms].includes('')) {
      console.log("Check your fields")

      setError(true);
      return
    }

    setError(false);

    const patientObject = {
      name,
      owner,
      email,
      date,
      symptoms
    }

    if(patient.id) {
      //Editing patient
      patientObject.id = patient.id
      const updatedPatients = patients.map(patientState => patientState.id === patient.id ? patientObject : patientState);

      setPatients(updatedPatients);
      setPatient({});
    }
    else {
      //New patient
      patientObject.id = generateID();
      setPatients([...patients, patientObject]);

    }

    // Reset form

    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");

    
  }

  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Patient monitoring</h2>
      
      <p className='text-lg mt-5 text-center mb-10'>
        Add patient and {''}
        <span className='text-indigo-600 font-bold'>manage</span>
      </p>

      <form
        onSubmit={handleSubmit} 
        className='bg-white shadow-md rounded py-10 px-5 mb-10 mx-5'
      >
        {error && <Error>All fields required</Error>}
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
            Pet's name
          </label>
          <input
            id = 'mascota'
            type="text" 
            placeholder="Pet's name"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className='mb-5'>
          <label htmlFor='owner' className='block text-gray-700 uppercase font-bold'>
            Owner's name
          </label>
          <input
            id = 'owner'
            type="text" 
            placeholder="Owner's name"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        
        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
            Email
          </label>
          <input
            id = 'email'
            type="email" 
            placeholder="Owner's email"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='discharge' className='block text-gray-700 uppercase font-bold'>
            Discharge a patient
          </label>
          <input
            id = 'discharge'
            type="date" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='discharge' className='block text-gray-700 uppercase font-bold'>
            Symptoms
          </label>
          <textarea 
            id='symptoms'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe the symptoms'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all "
          value={patient.id ? 'Edit patient' : 'Add patient'}
        />
      </form>
    </div>
  )
}

export default Form

//rafce
//rfce