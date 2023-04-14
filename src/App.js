import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import { Dashboard, Calendar, Chores, ColorPicker, FamilyMembers, FamilyRecipes, FoodScheduler, Planner, Scheduler, SharedLogins, Line, Bar, Pie } from './pages'

import "./App.css";

function App() {
  const activeMenu = true;
  //const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-mai-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg 
          min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
          </div>

          <div>
            <Routes>
              {/* DASHBOARD */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* PAGES & APPS */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/chores" element={<Chores />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/family-members" element={<FamilyMembers />} />
              <Route path="/family-recipes" element={<FamilyRecipes />} />
              <Route path="/food-scheduler" element={<FoodScheduler />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/shared-logins" element={<SharedLogins />} />

              {/* CHARTS */}
              <Route path="/line" element={<Line />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
