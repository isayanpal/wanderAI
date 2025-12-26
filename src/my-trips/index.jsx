import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronLeft, ChevronRight, MapPin, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

/**
 * Animation variants for stagger effects
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 trips per page for a nice grid

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    try {
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      // Sort trips by newest first if possible, or just reverse to show latest added
      // Assuming no timestamp, just reversing order of addition usually flows better, or use sorting if field exists
      setUserTrips(trips.reverse());
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrips = userTrips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userTrips.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6"
          variants={itemVariants}
        >
          <div>
            <h2 className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
              My Adventures
            </h2>
            <p className="text-gray-400 text-lg">
              Manage and revisit your AI-curated journeys
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            {userTrips.length > 0 && (
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 font-medium">
                {userTrips.length} {userTrips.length === 1 ? "Trip" : "Trips"}{" "}
                Found
              </span>
            )}
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            className="flex flex-col justify-center items-center h-64 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-gray-400 animate-pulse">Loading your trips...</p>
          </motion.div>
        ) : userTrips.length > 0 ? (
          <>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {currentTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <UserTripCard trip={trip} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center mt-16 gap-2"
                variants={itemVariants}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    // Show limited page numbers if too many pages (simple implementation for now: show all if < 5, otherwise truncate logic could be added but let's stick to simple first)
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`min-w-[40px] h-10 px-3 rounded-full text-sm font-medium transition-all ${
                        currentPage === number
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-white/5"
            variants={itemVariants}
          >
            <div className="bg-purple-500/20 p-6 rounded-full mb-6 relative group">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
              <MapPin className="w-12 h-12 text-purple-400 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No trips found
            </h3>
            <p className="text-gray-400 max-w-md mb-8">
              It looks like you haven't planned any trips yet. Start your
              journey by creating your first adventure!
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-600/20"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create New Trip
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
