import React from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

type Props = ModalProps & {
  discord: string;
  onClose: () => void;
};

export const DuoMatch: React.FC<Props> = ({ discord, onClose, ...rest }) => {
  return (
    <Modal {...rest} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione do Discord</Text>
          <TouchableOpacity style={styles.discordButton}>
            <Text style={styles.discord}>{discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
