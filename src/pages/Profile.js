import React, { useState, useEffect } from "react";  

function Profile() {  
  const [activeTab, setActiveTab] = useState("profile");  
  const [userInfo, setUserInfo] = useState({  
    name: '',  
    gender: '',  
    email: '',  
    phone: '',  
    address: ''  
  });  
  const [editMode, setEditMode] = useState(false);  

  const [step, setStep] = useState(0);  
  const [diabetesType, setDiabetesType] = useState(localStorage.getItem('diabetesType') || 'none');  
  const [favoriteFlavors, setFavoriteFlavors] = useState(JSON.parse(localStorage.getItem('favoriteFlavors')) || []);  
  const [quizSubmitted, setQuizSubmitted] = useState(localStorage.getItem('quizSubmitted') === 'true');  

  const quizQuestions = [  
    {  
      question: "What type of diabetes do you have?",  
      options: [  
        { value: "none", label: "None" },  
        { value: "1", label: "Type 1" },  
        { value: "2", label: "Type 2" }  
      ]  
    },  
    {  
      question: "What are your favorite flavors?",  
      options: [  
        { value: "Sweet", label: "Sweet" },  
        { value: "Spicy", label: "Spicy" },  
        { value: "Salty", label: "Salty" }  
      ]  
    }  
  ];  

  useEffect(() => {  
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));  
    if (storedUserInfo) {  
      setUserInfo(storedUserInfo);  
    }  
  }, []);  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setUserInfo((prevState) => ({  
      ...prevState,  
      [name]: value  
    }));  
  };  

  const editInfo = () => {  
    setEditMode(true);  
  };  

  const saveInfo = (e) => {  
    e.preventDefault();  
    localStorage.setItem('userInfo', JSON.stringify(userInfo));  
    setEditMode(false);  
  };  

  const cancelEdit = () => {  
    setEditMode(false);  
  };  

  const handleQuizSubmit = (e) => {  
    e.preventDefault();  

    if (step === 0) {  
      localStorage.setItem('diabetesType', diabetesType);  
      setStep(step + 1);
    } else if (step === 1) {  
      localStorage.setItem('favoriteFlavors', JSON.stringify(favoriteFlavors));  
      localStorage.setItem('quizSubmitted', true);  
      setQuizSubmitted(true);   
    }  
  };  

  const handleRetakeQuiz = () => {  
    localStorage.removeItem('diabetesType');  
    localStorage.removeItem('favoriteFlavors');  
    localStorage.setItem('quizSubmitted', false);  
    setStep(0);  
    setDiabetesType('none');  
    setFavoriteFlavors([]);  
    setQuizSubmitted(false);  
  };  

  const handleFlavorChange = (e) => {  
    const { value, checked } = e.target;  
    if (checked) {  
      setFavoriteFlavors((prev) => [...prev, value]); // Add the value  
    } else {  
      setFavoriteFlavors((prev) => prev.filter((flavor) => flavor !== value)); // Remove the value  
    }  
  };  

  return (  
    <div>  
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">  
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">  
          <li className="me-2" role="presentation">  
            <button  
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "profile" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"} focus:outline-none`}  
              type="button"  
              onClick={() => setActiveTab("profile")}  
              role="tab"  
              aria-controls="profile"  
              aria-selected={activeTab === "profile"}  
            >  
              My Profile  
            </button>  
          </li>  
          <li className="me-2" role="presentation">  
            <button  
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "flavor" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"} focus:outline-none`}  
              type="button"  
              onClick={() => setActiveTab("flavor")}  
              role="tab"  
              aria-controls="flavor"  
              aria-selected={activeTab === "flavor"}  
            >  
              Flavor and Health  
            </button>  
          </li>  
        </ul>  
      </div>  

      <div id="default-tab-content">  
        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === "profile" ? "" : "hidden"}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">  
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Profile Information</h2>  

          {editMode ? (  
            <form className="mt-4" onSubmit={saveInfo}>  
              <div className="mb-4">  
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>  
                <input  
                  type="text"  
                  id="name"  
                  name="name"  
                  value={userInfo.name}  
                  onChange={handleChange}  
                  className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"  
                  placeholder="Enter your name"  
                  required  
                />  
              </div>  
              <div className="mb-4">  
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="gender">Gender</label>  
                <select  
                  id="gender"  
                  name="gender"  
                  value={userInfo.gender}  
                  onChange={handleChange}  
                  className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"  
                  required  
                >  
                  <option value="">Select Gender</option>  
                  <option value="male">Male</option>  
                  <option value="female">Female</option>  
                  <option value="other">Other</option>  
                </select>  
              </div>  
              <div className="mb-4">  
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>  
                <input  
                  type="email"  
                  id="email"  
                  name="email"  
                  value={userInfo.email}  
                  onChange={handleChange}  
                  className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"  
                  placeholder="Enter your email"  
                  required  
                />  
              </div>  
              <div className="mb-4">  
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">Phone Number</label>  
                <input  
                  type="tel"  
                  id="phone"  
                  name="phone"  
                  value={userInfo.phone}  
                  onChange={handleChange}  
                  className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"  
                  placeholder="Enter your phone number"  
                  required  
                />  
              </div>  
              <div className="mb-4">  
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">Address</label>  
                <textarea  
                  id="address"  
                  name="address"  
                  value={userInfo.address}  
                  onChange={handleChange}  
                  className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"  
                  placeholder="Enter your address"  
                  rows="3"  
                  required  
                ></textarea>  
              </div>  
              <div className="flex space-x-4">  
                <button  
                  type="submit"  
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"  
                >  
                  Save Changes  
                </button>  
                <button  
                  type="button"  
                  onClick={cancelEdit}  
                  className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none"  
                >  
                  Cancel  
                </button>  
              </div>  
            </form>  
          ) : (  
            <div>  
              <p><strong>Name:</strong> {userInfo.name}</p>  
              <p><strong>Gender:</strong> {userInfo.gender}</p>  
              <p><strong>Email:</strong> {userInfo.email}</p>  
              <p><strong>Phone Number:</strong> {userInfo.phone}</p>  
              <p><strong>Address:</strong> {userInfo.address}</p>  
              <button  
                onClick={editInfo}  
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"  
              >  
                Edit  
              </button>  
            </div>  
          )}  
        </div>  

        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === "flavor" ? "" : "hidden"}`} id="flavor" role="tabpanel" aria-labelledby="flavor-tab">  
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Flavor and Health</h2>  
          {quizSubmitted ? (  
            <div>  
              <p><strong>Diabetes Type:</strong> {diabetesType}</p>  
              <p><strong>Favorite Flavors:</strong> {favoriteFlavors.join(", ")}</p>  
              <button onClick={handleRetakeQuiz} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none">  
                Retake Quiz  
              </button>  
            </div>  
          ) : (  
            <div>  
              {step < quizQuestions.length ? (  
                <form onSubmit={handleQuizSubmit}>  
                  <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">{quizQuestions[step].question}</h3>  
                  <div className="mb-4">  
                    {step === 0 && quizQuestions[step].options.map((option) => (  
                      <div key={option.value}>  
                        <label>  
                          <input  
                            type="radio"  
                            name="diabetesType"  
                            value={option.value}  
                            checked={diabetesType === option.value}  
                            onChange={(e) => setDiabetesType(e.target.value)}  
                          />  
                          {option.label}  
                        </label>  
                      </div>  
                    ))}  
                    {step === 1 && quizQuestions[step].options.map((option) => (  
                      <div key={option.value}>  
                        <label>  
                          <input  
                            type="checkbox"  
                            value={option.value}  
                            checked={favoriteFlavors.includes(option.value)}  
                            onChange={handleFlavorChange}  
                          />  
                          {option.label}  
                        </label>  
                      </div>  
                    ))}  
                  </div>  
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none">  
                    {step === quizQuestions.length - 1 ? "Submit" : "Next Question"}  
                  </button>  
                </form>  
              ) : (  
                <p className="text-md font-medium text-gray-600 dark:text-gray-300">You have completed the quiz!</p>  
              )}  
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
}  

export default Profile;
