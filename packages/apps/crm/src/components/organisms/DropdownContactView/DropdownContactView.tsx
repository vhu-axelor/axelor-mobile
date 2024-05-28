/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  handlerApiCall,
  isEmpty,
  linkingProvider,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {
  ContactInfoCard,
  ContactInfoType,
  SocialNetworksInfoCard,
} from '../../molecules';
import {updateEmailApi, updateLeadApi, updatePartnerApi} from '../../../api';

interface Contact {
  address?: any;
  fixedPhone?: string;
  mobilePhone?: string;
  emailAddress?: any;
  webSite?: string;
}

interface NetworkData {
  name?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
}

interface DropdownContactViewProps {
  contact: Contact;
  isLead?;
  networkData?: NetworkData;
  refreshContactInfos: () => void;
}

const DropdownContactView = ({
  contact,
  isLead = false,
  networkData,
  refreshContactInfos,
}: DropdownContactViewProps) => {
  const I18n = useTranslator();

  const {userId} = useSelector((state: any) => state.auth);

  const getState = useCallback(() => ({auth: {userId}}), [userId]);

  const updateContactInfo = useCallback(
    ({id, version, data}) => {
      const dataApi = {id, version, ...data};

      handlerApiCall({
        fetchFunction: isLead ? updateLeadApi : updatePartnerApi,
        data: isLead ? {lead: dataApi} : dataApi,
        action: 'Crm_ApiAction_UpdateContactInfo',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState, isLead],
  );

  const updateEmail = useCallback(
    ({id, version, data}) => {
      handlerApiCall({
        fetchFunction: updateEmailApi,
        data: {id, version, email: data.email},
        action: 'Crm_ApiAction_UpdateContactInfo',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState],
  );

  if (
    !contact.address &&
    !contact.fixedPhone &&
    !contact.mobilePhone &&
    !contact.emailAddress &&
    !contact.webSite &&
    isEmpty(networkData)
  ) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoContactInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      <ContactInfoCard
        headerIconName="geo-alt-fill"
        title={I18n.t('Crm_Adress')}
        contact={contact}
        contactInfoType={ContactInfoType.type.Address}
        isLead={isLead}
        rightIconName="pin-map-fill"
        border={
          contact.fixedPhone != null ||
          contact.mobilePhone != null ||
          contact.emailAddress != null ||
          contact.webSite != null ||
          !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() =>
          linkingProvider.openMapApp(contact.address.fullName)
        }
        onUpdate={() => console.log('Address updated.')}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="telephone-fill"
        title={I18n.t('Crm_Phone')}
        contact={contact}
        contactInfoType={ContactInfoType.type.FixedPhone}
        isLead={isLead}
        rightIconName="telephone-fill"
        border={
          contact.mobilePhone != null ||
          contact.emailAddress != null ||
          contact.webSite != null ||
          !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(contact.fixedPhone)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="phone-fill"
        title={I18n.t('Crm_MobilePhone')}
        contact={contact}
        contactInfoType={ContactInfoType.type.MobilePhone}
        isLead={isLead}
        rightIconName="telephone-fill"
        border={
          contact.emailAddress != null ||
          contact.webSite != null ||
          !isEmpty(networkData)
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(contact.mobilePhone)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="envelope-fill"
        title={I18n.t('Crm_Email')}
        contact={contact}
        contactInfoType={ContactInfoType.type.Email}
        isLead={isLead}
        rightIconName="send-fill"
        border={contact.webSite != null || !isEmpty(networkData)}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() =>
          linkingProvider.openMailApp(contact.emailAddress?.address)
        }
        onUpdate={updateEmail}
        refreshContactInfos={refreshContactInfos}
      />
      <ContactInfoCard
        headerIconName="link-45deg"
        title={I18n.t('Crm_WebSite')}
        contact={contact}
        contactInfoType={ContactInfoType.type.WebSite}
        isLead={isLead}
        rightIconName="box-arrow-up-right"
        styleBorder={styles.borderInfoCard}
        border={!isEmpty(networkData)}
        rightIconAction={() => linkingProvider.openBrowser(contact.webSite)}
        onUpdate={updateContactInfo}
        refreshContactInfos={refreshContactInfos}
      />
      <SocialNetworksInfoCard {...networkData} />
    </View>
  );
};

const styles = StyleSheet.create({
  borderInfoCard: {
    width: '112%',
    left: '-5%',
  },
});

export default DropdownContactView;
