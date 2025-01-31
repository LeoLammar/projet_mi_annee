"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
// import HeaderLanding from "@/components/layout/HeaderLanding";
// import { useAuth } from "@/lib/authContext";



/*type UserData = {
  name: string;
  username: string;
  email: string;
  phone: string;
  prenom: string;
  nom: string;
  status: string;
  adresse: string;
  ville: string;
  codePostal: string;
  pays: string;
  permission?: string;
};*/
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
/*
const initialDataBase: UserData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  prenom: "",
  nom: "",
  status: "",
  adresse: "",
  ville: "",
  codePostal: "",
  pays: "",
};*/
const initialDataBase: UserData = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

type ProfileFieldProps = {
  label: string;
  name: keyof UserData;
  value: string;
  editable: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  name,
  value,
  editable,
  onChange,
}) => (
  <div className="mb-6">
    <p className="text-font-medium text-[#353535]">{label}</p>
    {editable ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border border-[#284B63] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#284B63]"
      />
    ) : (
      <p className="text-lg text-[#353535]">{value}</p>
    )}
  </div>
);

export default function Profile() {
 // const { user, isAuthenticated } = useAuth();
  const [editable, setEditable] = useState<boolean>(false);
  const [data, setData] = useState<UserData>(initialDataBase);
  const [image, setImage] = useState<string>("");

  const toggleEdit = async () => {
    if (editable) {
    }
    setEditable(!editable);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

//   useEffect(() => {
//     if (user) {
//       setData(user as UserData);
//     }
//   }, [user]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId") || "id_de_test"; // Remplace par un ID réel

      if (!userId || userId.length !== 24) {
        console.error("User ID invalide :", userId);
        return;
      }

      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const result = await response.json();

      if (result.success) {

        setData({
          firstName: result.user.firstName || "",
          lastName: result.user.lastName || "",
          email: result.user.email || "",
          role: result.user.role || "",
        });
      } else {
        console.error("Erreur récupération profil :", result.message);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
    }
  };

  fetchProfile();
}, []);


  return (
    <div className="bg-white">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#284B63] text-center">
          Mon Profil
        </h1>
        <div className="border border-[#D9D9D9] pb-6 mb-8 rounded-xl shadow-lg p-8 bg-[#D9D9D9]">
          <div className="flex items-center mb-8">
            <div className="relative mb-6">
              <img
                src={
                  image ||
                  "https://media.istockphoto.com/id/1142192548/fr/vectoriel/profil-davatar-de-lhomme-silhouette-de-visage-m%C3%A2le-ou-ic%C3%B4ne-disolement-sur-le-fond.jpg?s=612x612&w=0&k=20&c=Fe6gJZnL9Lgli0B7cwhJEjG6vKMn-2tHKqSCvG1GHjw="
                }
                alt="Photo de Profil"
                className="w-24 h-24 rounded-full border border-[#284B63] object-cover mb-4"
              />
              {editable && (
                <input
                  type="file"
                  className="block w-full text-[#353535]"
                  onChange={handleImageChange}
                />
              )}
            </div>
            <div className="p-5">
              <p className="text-2xl font-semibold text-[#284B63]">
                Bonjour {data.firstName}
              </p>
              {/*
              <p className="text-[#353535]">Rôle : {data.permission}</p>
              <p className="text-[#353535]">
                {data.ville} {data.pays}
              </p>*/}
            </div>
            <button
              className="ml-auto text-[#353535 bg-[#3C6E71] rounded-full px-6 py-2 "
              onClick={toggleEdit}
            >
              {editable ? "Enregistrer" : "Modifier"}
            </button>
          </div>
          <ProfileField
            label="Prénom"
            name="firstName"
            value={data.firstName}
            editable={editable}
            onChange={handleChange}
          />
          <ProfileField
            label="Nom"
            name="lastName"
            value={data.lastName}
            editable={editable}
            onChange={handleChange}
          />
          <ProfileField
            label="Email"
            name="email"
            value={data.email}
            editable={editable}
            onChange={handleChange}
          />
          <ProfileField
            label="Rôle"
            name="role"
            value={data.role}
            editable={editable}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
