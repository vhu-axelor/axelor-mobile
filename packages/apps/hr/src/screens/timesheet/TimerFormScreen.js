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

import React, {useMemo} from 'react';
import {FormView} from '@axelor/aos-mobile-core';

const TimerFormScreen = ({route}) => {
  const {timer} = route?.params;

  const defaultValue = useMemo(() => {
    if (timer != null) {
      return {
        timerDate: timer.startDateTime,
        project: timer.project?.name,
        projectTask: timer.projectTask?.name,
        duration: timer.duration,
        comments: timer.comments,
      };
    }

    return {
      timerDate: new Date().toISOString().split('T')[0],
    };
  }, [timer]);

  return (
    <FormView defaultValue={defaultValue} actions={[]} formKey="hr_Timer" />
  );
};

export default TimerFormScreen;
