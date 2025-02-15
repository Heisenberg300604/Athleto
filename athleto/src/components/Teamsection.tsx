import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    name: "Arsh Tiwari",
    role: "Full Stack Developer",
    image: "/arsh.png",
    socials: {
      github: "https://github.com/ArshTiwari2004",
      linkedin: "https://www.linkedin.com/in/arsh-tiwari-072609284/",
      twitter: "https://x.com/ArshTiwari17"
    }
  },
  {
    name: "Priyanshi Bothra",
    role: "UI/UX Designer & Frontend Developer",
    image: "/priyanshi.png",
    socials: {
      github: "https://github.com/priyanshi0609",
      linkedin: "https://www.linkedin.com/in/priyanshi-bothra-339568219/",
      twitter: "https://x.com/PriyanshiB06"
    }
  },
  {
    name: "Nibedan Pati",
    role: "Full stack Developer",
    image: "/nibedan.png",
    socials: {
      github: "https://github.com/Heisenberg300604",
      linkedin: "https://www.linkedin.com/in/nibedan-pati-2139b3277/",
      twitter: "https://x.com/NibedanPati"
    }
  },
  {
    name: "Chandan Sahoo",
    role: "Frontend Developer",
    image: "/chandan.jpg",
    socials: {
      github: "https://github.com/chandanSahoo-cs",
      linkedin: "https://www.linkedin.com/in/chandansahoo-cs/",
      twitter: "https://x.com/chandanSahoo_cs"
    }
  }
]

export default function TeamSection() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Meet Our Team
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            The passionate individuals behind Athleto working to transform the landscape of sports in India.
          </p>
        </div>
        
        <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-black/40 p-4 sm:p-6 transition-all hover:bg-black/60 hover:transform hover:scale-105 duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-white text-center">
                  {member.name}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-indigo-400 text-center px-2">
                  {member.role}
                </p>
                <div className="mt-3 sm:mt-4 flex space-x-3 sm:space-x-4">
                  <Link 
                    href={member.socials.github} 
                    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200"
                    target="_blank"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link 
                    href={member.socials.linkedin} 
                    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200"
                    target="_blank"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link 
                    href={member.socials.twitter} 
                    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200"
                    target="_blank"
                  >
                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}