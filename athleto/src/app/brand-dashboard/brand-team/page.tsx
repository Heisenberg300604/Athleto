import BrandNavbar from '@/components/BrandNavbar';
import { Github, Linkedin, Twitter, Instagram , Bot } from 'lucide-react';
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    bot?: string
    
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Arsh Tiwari",
    role: "Full Stack Developer",
    bio: "Leading the technical architecture and development of Athleto's core platform.",
    image: "/arsh.png?height=600&width=600",
    socials: {
      github: "https://github.com/ArshTiwari2004",
      linkedin: "https://www.linkedin.com/in/arsh-tiwari-072609284/",
      twitter: "https://x.com/ArshTiwari17",
      instagram: "https://www.instagram.com/_.arshtiwari",
      bot: "https://arsh-tiwari-portfolio.vercel.app/"
    },
  },
  {
    id: 2,
    name: "Priyanshi Bothra",
    role: "UI/UX Designer & Frontend Developer",
    bio: "Crafting beautiful and intuitive experiences for athletes and brands.",
    image: "/priyanshi.png?height=600&width=600",
    socials: {
      github: "https://github.com/priyanshi0609",
      linkedin: "https://www.linkedin.com/in/priyanshi-bothra-339568219/",
      twitter: "https://x.com/PriyanshiB06",
      instagram: "https://www.instagram.com/_.priyanshi.01__",
      bot:"",
    },
  },
  {
    id: 3,
    name: "Nibedan Pati",
    role: "Full stack Developer",
    bio: "Building robust and scalable infrastructure to power the future of sports.",
    image: "/nibedan.png?height=600&width=600",
    socials: {
      github: "https://github.com/Heisenberg300604",
      linkedin: "https://www.linkedin.com/in/nibedan-pati-2139b3277/",
      twitter:"https://x.com/NibedanPati",
      instagram: "https://www.instagram.com/nibedan_3006",
    },
  },
  {
    id: 4,
    name: "Chandan Sahoo",
    role: "Frontend Developer",
    bio: "Crafting web experiences that transform how athletes connect with their sport.",
    image: "/chandan.jpg?height=600&width=600",
    socials: {
      github:"https://github.com/chandanSahoo-cs",
      linkedin: "https://www.linkedin.com/in/chandansahoo-cs/",
      twitter: "https://x.com/chandanSahoo_cs",
      instagram:"https://www.instagram.com/chandan_sahoo001/"
    },
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet the Minds Behind <span className="text-[#6C5CE7]">Athleto</span>
          </h1>
          <p className="text-xl text-gray-600">
            A team of passionate individuals working together to revolutionize the sports industry and empower athletes
            worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 aspect-square relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[#6C5CE7] font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    {member.socials.github && (
                      <Link
                        href={member.socials.github}
                        className="text-gray-600 hover:text-[#6C5CE7] transition-colors p-2 rounded-full hover:bg-purple-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {member.socials.linkedin && (
                      <Link
                        href={member.socials.linkedin}
                        className="text-gray-600 hover:text-[#6C5CE7] transition-colors p-2 rounded-full hover:bg-purple-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {member.socials.twitter &&(
                      <Link
                        href={member.socials.twitter}
                        className="text-gray-600 hover:text-[#6C5CE7] transition-colors p-2 rounded-full hover:bg-purple-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {member.socials.instagram && (
                      <Link
                        href={member.socials.instagram}
                        className="text-gray-600 hover:text-[#6C5CE7] transition-colors p-2 rounded-full hover:bg-purple-50"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Instagram className="h-5 w-5" />
                        
                      </Link>
                    
                    )}
                    {member.socials.bot && (
                      <Link
                       href={member.socials.bot}
                       className="text-gray-600 hover:text-[#6C5CE7] transition-colors p-2 rounded-full hover:bg-purple-50"
                       target="_blank"
                       rel="noopener noreferrer"
                        >
                        <Bot className="h-5 w-5" />
                      </Link>
                    )}

                        

                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

