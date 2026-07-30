/**
 * Registre central des icônes Lucide utilisées dans le site.
 *
 * Les données de contenu référencent une icône par sa clé (chaîne
 * sérialisable, compatible Payload) ; les composants résolvent la clé via
 * ce registre. Le handoff recommande d'utiliser Lucide plutôt que de recopier
 * les `path` SVG dessinés à la main.
 */
import {
  MessageCircle,
  Lightbulb,
  Compass,
  Users,
  Zap,
  MapPin,
  Layers,
  Building2,
  Calendar,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type IconKey =
  | "message"
  | "lightbulb"
  | "compass"
  | "users"
  | "zap"
  | "pin"
  | "layers"
  | "building"
  | "calendar"
  | "mail";

export const ICONS: Record<IconKey, LucideIcon> = {
  message: MessageCircle,
  lightbulb: Lightbulb,
  compass: Compass,
  users: Users,
  zap: Zap,
  pin: MapPin,
  layers: Layers,
  building: Building2,
  calendar: Calendar,
  mail: Mail,
};
