import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

//DATA
import { familyRecipesGrid } from "../data/gridData";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";

import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const FamilyRecipes = () => {
  const { currentColor } = useStateContext();
  const [familyRecipes, setFamilyRecipes] = useState([]);

  const fetchData = async () => {
    const docCollection = query(
      collection(db, "familyrecipes"),
      orderBy("Name")
    );
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          id: doc.id,
          Recipe: doc.data().Recipe,
          ServingSize: doc.data().ServingSize,
        };
        list.push(data);
      });
      setFamilyRecipes(list);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Meals" title="Recipes" />
      <div className="mt-6">
        <Button
          color="white"
          bgColor={currentColor}
          text="Add Recipe"
          borderRadius="10px"
          size="md"
        />
      </div>

      <GridComponent
        id="gridcomp"
        dataSource={familyRecipes}
        allowPaging
        allowSorting
        toolbar={["Search", "Delete"]}
        editSettings={{
          allowDeleting: true,
        }}
        width="auto"
      >
        <ColumnsDirective>
          {familyRecipesGrid.map((item, index) => (
            <ColumnDirective key={item.id} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default FamilyRecipes;
