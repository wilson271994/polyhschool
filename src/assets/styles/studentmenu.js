import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './theme';

const { width } = Dimensions.get('window');
export const ORBIT_SIZE = width * 0.74;
export const CORE_SIZE = 100;
export const ORBIT_ITEM_SIZE = 58;

export const studentmenustyle = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  /* ────────────── SECTION 1 : ANNEAU ORBITAL PRINCIPAL ────────────── */
  orbitSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ORBIT_SIZE + 50,
    width: '100%',
    marginVertical: 10,
  },
  
  // Halo externe phosphorescent
  glowBackdrop: {
    position: 'absolute',
    width: ORBIT_SIZE + 20,
    height: ORBIT_SIZE + 20,
    borderRadius: (ORBIT_SIZE + 20) / 2,
    backgroundColor: 'rgba(54, 209, 220, 0.05)',
  },

  // Anneau physique en rotation
  orbitRing: {
    position: 'absolute',
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    borderRadius: ORBIT_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 179, 0, 0.35)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cœur central Poly-H
  coreBadge: {
    position: 'absolute',
    width: CORE_SIZE,
    height: CORE_SIZE,
    borderRadius: CORE_SIZE / 2,
    backgroundColor: COLORS.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.accentGold,
    elevation: 12,
    shadowColor: COLORS.accentGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },
  coreText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.accentGold,
    marginTop: 2,
    letterSpacing: 1,
  },

  // Boutons sur l'orbite
  orbitItemWrapper: {
    position: 'absolute',
    width: ORBIT_ITEM_SIZE,
    alignItems: 'center',
  },
  orbitItemBtn: {
    width: ORBIT_ITEM_SIZE,
    height: ORBIT_ITEM_SIZE,
    borderRadius: ORBIT_ITEM_SIZE / 2,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.borderGold,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  orbitItemLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 4,
    width: 76,
  },

  /* ────────────── SECTION 2 : SERVICES SCOLAIRES ────────────── */
  servicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 6,
    marginTop: 25,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  titleBadge: {
    backgroundColor: 'rgba(54, 209, 220, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(54, 209, 220, 0.3)',
  },
  titleBadgeText: {
    fontSize: 10,
    color: COLORS.accentCyan,
    fontWeight: 'bold',
  },

  // Grille des services
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  serviceCard: {
    width: (width - 44) / 2, // 2 colonnes bien équilibrées
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  serviceIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  serviceSub: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
});