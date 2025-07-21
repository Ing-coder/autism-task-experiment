(function() {
    const startBtn = document.getElementById('startBtn');
    const taskContainer = document.getElementById('taskContainer');
    const introContainer = document.getElementById('introContainer');
    const participantIDDisplay = document.getElementById('participantID');
    const consentCheckbox = document.getElementById('consent');
    const ageGroupSelect = document.getElementById('ageGroup');
    const educationLevelSelect = document.getElementById('educationLevel');
    const autismDiagnosisSelect = document.getElementById('autismDiagnosis');
    const autismDetailsDiv = document.getElementById('autismDetails');
    const autismFunctionSelect = document.getElementById('autismFunction');
    const task1Div = document.getElementById('task1');
    const task2Div = document.getElementById('task2');
    const task3Div = document.getElementById('task3');
    const task4Div = document.getElementById('task4');
    const task5Div = document.getElementById('task5');
    const switchA = document.getElementById('switchA');
    const switchB = document.getElementById('switchB');
    const hatA = document.getElementById('hatA');
    const hatB = document.getElementById('hatB');
    const stockUp = document.getElementById('stockUp');
    const stockDown = document.getElementById('stockDown');
    const orbitA = document.getElementById('orbitA');
    const orbitB = document.getElementById('orbitB');
    const orbitC = document.getElementById('orbitC');
    const feedback = document.getElementById('feedback');
    const feedback2 = document.getElementById('feedback2');
    const feedback3 = document.getElementById('feedback3');
    const feedback4 = document.getElementById('feedback4');
    const feedback5 = document.getElementById('feedback5');
    const lightSuccessCount = document.getElementById('lightSuccessCount');
    const rabbitSuccessCount = document.getElementById('rabbitSuccessCount');
    const stockChart = document.getElementById('stockChart');

    const participantID = Math.floor(1000000 + Math.random() * 9000000);
    participantIDDisplay.textContent = participantID;

    let currentTask = 0, trial = 0, responses = [], startTime;
    let selectedIndices = [];
    const maxTrials = [20, 20, 10, 10, 10];
    const volatilitySchedule = Array(10).fill('high').concat(Array(10).fill('low'));
    let correctOption = { 1: Math.random() < 0.5 ? 'A' : 'B', 2: Math.random() < 0.5 ? 'A' : 'B' };
    let rewardProb = { 
        1: { A: correctOption[1] === 'A' ? 0.8 : 0.2, B: correctOption[1] === 'B' ? 0.8 : 0.2 },
        2: { A: correctOption[2] === 'A' ? 0.8 : 0.2, B: correctOption[2] === 'B' ? 0.8 : 0.2 }
    };
    let lightSuccesses = 0, rabbitSuccesses = 0;
    let arrowHat = 'A';
    let stockSequence = [];
    const orbitSequence = ['A', 'B', 'C', 'A', 'C', 'B', 'A', 'C', 'B', 'A', 'B'];
    const springSequence = Array(10).fill('A');
    const choicePositionSequence = ['left', 'right', 'left', 'right', 'left', 'right', 'left', 'right', 'left', 'right'];
    const springTrials = [
        { red: { springAmp: '60px', duration: '0.898s', amp: '150px', size: '2.5px' }, purpleA: { springAmp: '70px', duration: '1.511s', amp: '175px', size: '21.75px' }, purpleB: { springAmp: '70px', duration: '2.617s', amp: '175px', size: '21.75px' } },
        { red: { springAmp: '30px', duration: '1.269s', amp: '75px', size: '5px' }, purpleA: { springAmp: '40px', duration: '1.597s', amp: '100px', size: '24.25px' }, purpleB: { springAmp: '40px', duration: '2.767s', amp: '100px', size: '24.25px' } },
        { red: { springAmp: '50px', duration: '1.555s', amp: '125px', size: '7.75px' }, purpleA: { springAmp: '60px', duration: '1.679s', amp: '150px', size: '26.75px' }, purpleB: { springAmp: '60px', duration: '2.909s', amp: '150px', size: '26.75px' } },
        { red: { springAmp: '10px', duration: '1.795s', amp: '25px', size: '10.25px' }, purpleA: { springAmp: '20px', duration: '1.757s', amp: '50px', size: '29.25px' }, purpleB: { springAmp: '20px', duration: '3.044s', amp: '50px', size: '29.25px' } },
        { red: { springAmp: '80px', duration: '2.007s', amp: '200px', size: '12.75px' }, purpleA: { springAmp: '90px', duration: '1.832s', amp: '225px', size: '32px' }, purpleB: { springAmp: '90px', duration: '3.173s', amp: '225px', size: '32px' } },
        { red: { springAmp: '30px', duration: '1.036s', amp: '75px', size: '15.25px' }, purpleA: { springAmp: '40px', duration: '1.904s', amp: '100px', size: '34.5px' }, purpleB: { springAmp: '40px', duration: '1.555s', amp: '100px', size: '34.5px' } },
        { red: { springAmp: '80px', duration: '1.12s', amp: '200px', size: '17.75px' }, purpleA: { springAmp: '90px', duration: '1.973s', amp: '225px', size: '37px' }, purpleB: { springAmp: '90px', duration: '1.611s', amp: '225px', size: '37px' } },
        { red: { springAmp: '40px', duration: '1.12s', amp: '100px', size: '17.75px' }, purpleA: { springAmp: '50px', duration: '1.973s', amp: '125px', size: '37px' }, purpleB: { springAmp: '50px', duration: '1.611s', amp: '125px', size: '37px' } },
        { red: { springAmp: '90px', duration: '1.197s', amp: '225px', size: '20.5px' }, purpleA: { springAmp: '100px', duration: '2.04s', amp: '250px', size: '39.5px' }, purpleB: { springAmp: '100px', duration: '1.666s', amp: '250px', size: '39.5px' } },
        { red: { springAmp: '50px', duration: '1.517s', amp: '125px', size: '25.5px' }, purpleA: { springAmp: '60px', duration: '2.168s', amp: '150px', size: '44.75px' }, purpleB: { springAmp: '60px', duration: '2.007s', amp: '150px', size: '44.75px' } }
    ];

    let hgf = {
        1: { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa: 1, zeta: 0.1, noise: 0.2, mu2_0: 0, sa2_2_0: 1, mu3_0: 0, sa2_3_0: 1 },
        2: { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa: 1, zeta: 0.1, noise: 0.2, mu2_0: 0, sa2_2_0: 1, mu3_0: 0, sa2_3_0: 1 },
        3: { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa: 1, zeta: 0.1, noise: 0, mu2_0: 0, sa2_2_0: 1, mu3_0: 0, sa2_3_0: 1 },
        4: { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa: 1, zeta: 0.1, noise: 0, mu2_0: 0, sa2_2_0: 1, mu3_0: 0, sa2_3_0: 1 },
        5: { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa: 1, zeta: 0.1, noise: 0, mu2_0: 0, sa2_2_0: 1, mu3_0: 0, sa2_3_0: 1 }
    };

    let stockChartInstance;
    const stockData = Array(30).fill(100);
    let noiseX = 0;

    // Store spring elements globally to prevent loss
    let blueSpring = document.getElementById('blueSpring');
    let redSpring = document.getElementById('redSpring');

    function perlinNoise() {
        noiseX += 1.0;
        let n = 0, amplitude = 1, frequency = 1, totalAmplitude = 0;
        for (let i = 0; i < 4; i++) {
            n += (Math.sin(noiseX * frequency) + Math.cos(noiseX * frequency * 0.5)) * amplitude;
            totalAmplitude += amplitude;
            amplitude *= 0.5;
            frequency *= 2;
        }
        return (n / (2 * totalAmplitude) + 0.5);
    }

    function checkStartButton() {
        const allFieldsFilled = ageGroupSelect.value && educationLevelSelect.value && autismDiagnosisSelect.value &&
            (autismDiagnosisSelect.value === 'no' || autismFunctionSelect.value);
        startBtn.disabled = !(consentCheckbox.checked && allFieldsFilled);
        if (!startBtn.disabled) {
            console.log('Start button enabled');
        } else {
            console.log('Start button disabled: consent=', consentCheckbox.checked, 'fields=', allFieldsFilled);
        }
    }

    consentCheckbox.addEventListener('change', checkStartButton);
    ageGroupSelect.addEventListener('change', checkStartButton);
    educationLevelSelect.addEventListener('change', checkStartButton);
    autismDiagnosisSelect.addEventListener('change', () => {
        autismDetailsDiv.style.display = autismDiagnosisSelect.value === 'yes' ? 'block' : 'none';
        if (autismDiagnosisSelect.value === 'no') autismFunctionSelect.value = '';
        checkStartButton();
    });
    autismFunctionSelect.addEventListener('change', checkStartButton);

    startBtn.addEventListener('click', () => {
        console.log('Start button clicked');
        introContainer.style.display = 'none';
        taskContainer.style.display = 'block';
        // Reinitialize spring elements to ensure they are available
        blueSpring = document.getElementById('blueSpring');
        redSpring = document.getElementById('redSpring');
        fitHGFParameters().then(() => startTask(1));
    });

    function initStockChart() {
        if (!stockChart || !window.Chart) {
            console.error('Chart.js or stockChart canvas not available');
            feedback3.textContent = 'Error: Chart not available';
            return;
        }
        const chartLabels = Array.from({length: 30}, (_, i) => (i + 1).toString());
        const movingAverageData = calculateMovingAverage(stockData);
        stockChartInstance = new Chart(stockChart, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    { label: 'Stock Price', data: stockData.slice(0, 20).concat(Array(10).fill(null)), borderColor: '#2196F3', fill: false },
                    { label: 'Moving Average', data: movingAverageData.slice(0, 20).concat(Array(10).fill(null)), borderColor: 'red', fill: false }
                ]
            },
            options: { scales: { y: { beginAtZero: false, min: 50, max: 150 } } }
        });
    }

    function calculateMovingAverage(data) {
        const windowSize = 5;
        return Array.from({length: data.length}, (_, i) => 
            i < windowSize - 1 ? null : 
            data.slice(i - windowSize + 1, i + 1).reduce((a, b) => a + b) / windowSize
        );
    }

    function sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    function drawOrbitScenario(ctx, trialIndex, canvasWidth, canvasHeight) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const scaleX = canvasWidth / 400, scaleY = canvasHeight / 200;
        const radius = 10 * Math.min(scaleX, scaleY);
        const arrowLength = 40 * Math.min(scaleX, scaleY);
        const arrowHeadSize = 8 * Math.min(scaleX, scaleY);

        function drawArrow(x, y, dx, dy, color) {
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2;
            const mag = Math.sqrt(dx * dx + dy * dy);
            if (mag === 0) return;
            const unitDx = dx / mag, unitDy = dy / mag;
            const endX = x + arrowLength * unitDx, endY = y + arrowLength * unitDy;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - arrowHeadSize * (unitDx * Math.cos(Math.PI / 6) - unitDy * Math.sin(Math.PI / 6)),
                      endY - arrowHeadSize * (unitDy * Math.cos(Math.PI / 6) + unitDx * Math.sin(Math.PI / 6)));
            ctx.lineTo(endX - arrowHeadSize * (unitDx * Math.cos(Math.PI / 6) + unitDy * Math.sin(Math.PI / 6)),
                      endY - arrowHeadSize * (unitDy * Math.cos(Math.PI / 6) - unitDx * Math.sin(Math.PI / 6)));
            ctx.closePath();
            ctx.fill();
        }

        const redX = (100 + 50 * Math.cos(trialIndex)) * scaleX;
        const redY = (100 + 50 * Math.sin(trialIndex)) * scaleY;
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(redX, redY, radius, 0, 2 * Math.PI);
        ctx.fill();
        drawArrow(redX, redY, -50 * Math.sin(trialIndex) * scaleX, 50 * Math.cos(trialIndex) * scaleY, '#FF0000');

        const greenX = (150 + 50 * Math.cos(trialIndex + 2)) * scaleX;
        const greenY = (100 + 50 * Math.sin(trialIndex + 2)) * scaleY;
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(greenX, greenY, radius, 0, 2 * Math.PI);
        ctx.fill();
        drawArrow(greenX, greenY, -50 * Math.sin(trialIndex + 2) * scaleX, 50 * Math.cos(trialIndex + 2) * scaleY, '#00FF00');

        const blueX = (200 + 50 * Math.cos(trialIndex + 4)) * scaleX;
        const blueY = (100 + 50 * Math.sin(trialIndex + 4)) * scaleY;
        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.arc(blueX, blueY, radius, 0, 2 * Math.PI);
        ctx.fill();
        drawArrow(blueX, blueY, -50 * Math.sin(trialIndex + 4) * scaleX, 50 * Math.cos(trialIndex + 4) * scaleY, '#0000FF');

        return { redX, redY, greenX, greenY, blueX, blueY };
    }

    async function fitHGFParameters() {
        const kappaValues = [0.5, 1, 1.5];
        const zetaValues = [0.05, 0.1, 0.2];
        const tasks = [1, 2, 3, 4, 5];
        for (let task of tasks) {
            let bestLogLikelihood = -Infinity, bestKappa = 1, bestZeta = 0.1;
            for (let kappa of kappaValues) {
                for (let zeta of zetaValues) {
                    let tempHGF = { mu2: 0, sa2_2: 1, mu3: 0, sa2_3: 1, kappa, zeta, noise: task <= 2 ? 0.2 : 0 };
                    let logLikelihood = 0;
                    for (let t = 0; t < maxTrials[task - 1]; t++) {
                        let reward = 0;
                        if (task === 1) {
                            let choice = correctOption[1];
                            reward = Math.random() < tempHGF.noise ? (Math.random() < 0.5 ? 1 : 0) : (Math.random() < rewardProb[1][choice] ? 1 : 0);
                        } else if (task === 2) {
                            let choice = correctOption[2];
                            reward = Math.random() < tempHGF.noise ? (Math.random() < 0.5 ? 1 : 0) : (Math.random() < rewardProb[2][choice] ? 1 : 0);
                        } else if (task === 3) {
                            reward = Math.random() < 0.5 ? 1 : 0;
                        } else if (task === 4) {
                            reward = Math.random() < 0.33 ? 1 : 0;
                        } else if (task === 5) {
                            reward = 1;
                        }
                        const predMu2 = tempHGF.mu2;
                        const w2 = 1 / (1 + Math.exp(tempHGF.kappa * tempHGF.mu3));
                        const predError = reward - sigmoid(predMu2);
                        tempHGF.mu2 = predMu2 + w2 * predError;
                        tempHGF.sa2_2 = tempHGF.sa2_2 + w2 * (1 - w2) * predError * predError;
                        const predMu3 = tempHGF.mu3;
                        tempHGF.mu3 = predMu3 + tempHGF.zeta * (predError * predError - Math.exp(predMu3));
                        tempHGF.sa2_3 = tempHGF.sa2_3 + tempHGF.zeta * (1 - tempHGF.zeta);
                        logLikelihood += Math.log(sigmoid(predMu2) * reward + (1 - sigmoid(predMu2)) * (1 - reward));
                    }
                    if (logLikelihood > bestLogLikelihood) {
                        bestLogLikelihood = logLikelihood;
                        bestKappa = kappa;
                        bestZeta = zeta;
                    }
                }
            }
            hgf[task].kappa = bestKappa;
            hgf[task].zeta = bestZeta;
        }
    }

    function resetSpringContainer(springContainer, blueSpring, redSpring, purpleA, purpleB) {
        if (!springContainer || !blueSpring || !redSpring || !purpleA || !purpleB) {
            console.error('One or more spring elements are null:', {
                springContainer: !!springContainer,
                blueSpring: !!blueSpring,
                redSpring: !!redSpring,
                purpleA: !!purpleA,
                purpleB: !!purpleB
            });
            feedback5.textContent = 'Error: Spring elements not available';
            return false;
        }
        while (springContainer.firstChild) {
            springContainer.removeChild(springContainer.firstChild);
        }
        blueSpring.style.display = 'none';
        redSpring.style.display = 'none';
        purpleA.style.display = 'none';
        purpleB.style.display = 'none';
        purpleA.disabled = true;
        purpleB.disabled = true;
        return true;
    }

    function startTask(taskNum) {
        currentTask = taskNum;
        trial = 0;
        [task1Div, task2Div, task3Div, task4Div, task5Div].forEach(div => div.style.display = 'none');
        document.getElementById(`task${taskNum}`).style.display = 'block';
        let orbitCtx;
        if (taskNum === 4) {
            const orbitCanvas = document.getElementById('orbitCanvas');
            if (orbitCanvas) orbitCtx = orbitCanvas.getContext('2d');
            else {
                console.error('orbitCanvas not found');
                feedback4.textContent = 'Error: Canvas not available';
            }
        } else if (taskNum === 5) {
            const task5Intro = document.getElementById('task5Intro');
            const springContainer = document.getElementById('springContainer');
            if (!task5Intro || !springContainer) {
                console.error('Task 5 elements missing:', {
                    task5Intro: !!task5Intro,
                    springContainer: !!springContainer
                });
                feedback5.textContent = 'Error: Task 5 elements not available';
                return;
            }
            task5Intro.style.display = 'block';
            springContainer.style.display = 'none';
            feedback5.textContent = '';
            // Reinitialize spring elements
            blueSpring = document.getElementById('blueSpring');
            redSpring = document.getElementById('redSpring');
            if (blueSpring) {
                blueSpring.style.setProperty('--spring-amp', '10px');
                blueSpring.querySelector('.spring').style.animationDuration = '1.419s';
                blueSpring.querySelector('.mass').style.animationDuration = '1.419s';
                blueSpring.querySelector('.mass').style.setProperty('--amp', '25px');
                blueSpring.querySelector('.mass').style.setProperty('--size', '19.25px');
            } else {
                console.error('blueSpring element not found');
                feedback5.textContent = 'Error: Blue spring element not available';
                return;
            }
            const getStartedBtn = document.getElementById('getStartedBtn');
            if (!getStartedBtn) {
                console.error('getStartedBtn not found');
                feedback5.textContent = 'Error: Get Started button not available';
                return;
            }
            getStartedBtn.removeEventListener('click', startSpringTrial);
            getStartedBtn.addEventListener('click', () => {
                console.log('Get Started clicked for Task 5');
                task5Intro.style.display = 'none';
                springContainer.style.display = 'flex';
                feedback5.textContent = '';
                const purpleA = document.getElementById('purpleA');
                const purpleB = document.getElementById('purpleB');
                if (!purpleA || !purpleB) {
                    console.error('purpleA or purpleB elements not found');
                    feedback5.textContent = 'Error: Choice elements not available';
                    return;
                }
                purpleA.removeEventListener('click', () => processChoice('A'));
                purpleB.removeEventListener('click', () => processChoice('B'));
                purpleA.addEventListener('click', () => processChoice('A'));
                purpleB.addEventListener('click', () => processChoice('B'));
                // Reinitialize spring elements before starting trial
                blueSpring = document.getElementById('blueSpring');
                redSpring = document.getElementById('redSpring');
                startSpringTrial();
            });
            return;
        }
        if (taskNum === 1) {
            lightSuccesses = 0;
            lightSuccessCount.textContent = '0%';
            startTrial();
        } else if (taskNum === 2) {
            rabbitSuccesses = 0;
            rabbitSuccessCount.textContent = '0%';
            arrowHat = Math.random() < 0.8 ? correctOption[2] : (correctOption[2] === 'A' ? 'B' : 'A');
            hatA.src = arrowHat === 'A' ? 'arrow-hat.png' : 'no arrow-hat.png';
            hatB.src = arrowHat === 'B' ? 'arrow-hat.png' : 'no arrow-hat.png';
            startTrial();
        } else if (taskNum === 3) {
            let balanced = false, attempts = 0;
            while (!balanced && attempts < 100) {
                noiseX = Math.random() * 100;
                stockData[0] = 100;
                for (let i = 1; i < 30; i++) {
                    const noise = perlinNoise();
                    const change = (noise - 0.5) * 50;
                    stockData[i] = Math.max(50, Math.min(150, stockData[i - 1] + change));
                }
                stockSequence = [];
                for (let i = 20; i < 30; i++) {
                    stockSequence.push(stockData[i] > stockData[i - 1] ? 'Up' : 'Down');
                }
                const upCount = stockSequence.filter(s => s === 'Up').length;
                if (upCount >= 3 && upCount <= 7) balanced = true;
                else attempts++;
            }
            initStockChart();
            startTrial();
        } else if (taskNum === 4) {
            startTrial();
        }
    }

    function startSpringTrial() {
        if (trial >= maxTrials[currentTask - 1]) {
            console.log(`Task ${currentTask} completed with ${trial} trials`);
            saveResponses();
            return;
        }
        startTime = Date.now();
        console.log(`Starting Task 5, Trial ${trial + 1}`);
        const params = springTrials[trial];
        const springContainer = document.getElementById('springContainer');
        const purpleA = document.getElementById('purpleA');
        const purpleB = document.getElementById('purpleB');

        // Verify all elements
        if (!springContainer || !blueSpring || !redSpring || !purpleA || !purpleB) {
            console.error('Missing spring elements:', {
                springContainer: !!springContainer,
                blueSpring: !!blueSpring,
                redSpring: !!redSpring,
                purpleA: !!purpleA,
                purpleB: !!purpleB
            });
            feedback5.textContent = 'Error: Spring elements not available';
            return;
        }

        // Ensure elements are in the DOM
        if (!springContainer.contains(blueSpring)) {
            springContainer.appendChild(blueSpring);
        }
        if (!springContainer.contains(redSpring)) {
            springContainer.appendChild(redSpring);
        }

        // Reset container and elements
        if (!resetSpringContainer(springContainer, blueSpring, redSpring, purpleA, purpleB)) {
            return;
        }

        // Set spring properties
        redSpring.style.setProperty('--spring-amp', params.red.springAmp);
        redSpring.querySelector('.spring').style.animationDuration = params.red.duration;
        redSpring.querySelector('.mass').style.animationDuration = params.red.duration;
        redSpring.querySelector('.mass').style.setProperty('--amp', params.red.amp);
        redSpring.querySelector('.mass').style.setProperty('--size', params.red.size);
        purpleA.style.setProperty('--spring-amp', params.purpleA.springAmp);
        purpleA.querySelector('.spring').style.animationDuration = params.purpleA.duration;
        purpleA.querySelector('.mass').style.animationDuration = params.purpleA.duration;
        purpleA.querySelector('.mass').style.setProperty('--amp', params.purpleA.amp);
        purpleA.querySelector('.mass').style.setProperty('--size', params.purpleA.size);
        purpleB.style.setProperty('--spring-amp', params.purpleB.springAmp);
        purpleB.querySelector('.spring').style.animationDuration = params.purpleB.duration;
        purpleB.querySelector('.mass').style.animationDuration = params.purpleB.duration;
        purpleB.querySelector('.mass').style.setProperty('--amp', params.purpleB.amp);
        purpleB.querySelector('.mass').style.setProperty('--size', params.purpleB.size);

        // Append initial elements
        springContainer.appendChild(blueSpring);
        springContainer.appendChild(redSpring);

        startSpringSequence(params, blueSpring, redSpring, purpleA, purpleB, springContainer);
    }

    function startSpringSequence(params, blueSpring, redSpring, purpleA, purpleB, springContainer) {
        if (!blueSpring || !redSpring || !purpleA || !purpleB || !springContainer) {
            console.error('Missing spring elements in startSpringSequence:', {
                blueSpring: !!blueSpring,
                redSpring: !!redSpring,
                purpleA: !!purpleA,
                purpleB: !!purpleB,
                springContainer: !!springContainer
            });
            feedback5.textContent = 'Error: Spring elements not available';
            return;
        }
        blueSpring.style.display = 'block';
        redSpring.style.display = 'none';
        purpleA.style.display = 'none';
        purpleB.style.display = 'none';
        purpleA.disabled = true;
        purpleB.disabled = true;
        feedback5.textContent = 'Observing blue block...';
        console.log('Showing blue block, trial:', trial + 1);
        setTimeout(() => {
            blueSpring.style.display = 'none';
            redSpring.style.display = 'block';
            purpleA.style.display = 'none';
            purpleB.style.display = 'none';
            feedback5.textContent = 'Observing red block...';
            console.log('Showing red block, trial:', trial + 1);
            setTimeout(() => {
                blueSpring.style.display = 'none';
                redSpring.style.display = 'none';
                while (springContainer.firstChild) {
                    springContainer.removeChild(springContainer.firstChild);
                }
                if (choicePositionSequence[trial] === 'left') {
                    springContainer.appendChild(purpleA);
                    springContainer.appendChild(purpleB);
                } else {
                    springContainer.appendChild(purpleB);
                    springContainer.appendChild(purpleA);
                }
                purpleA.style.display = 'block';
                purpleB.style.display = 'block';
                feedback5.textContent = 'Choose the system with the same spring as the blue block.';
                purpleA.disabled = false;
                purpleB.disabled = false;
                console.log('Showing purple blocks, trial:', trial + 1);
            }, 5000);
        }, 5000);
    }

    function startTrial() {
        if (trial >= maxTrials[currentTask - 1]) {
            console.log(`Task ${currentTask} completed with ${trial} trials`);
            if (currentTask < 5) {
                startTask(currentTask + 1);
            } else {
                saveResponses();
            }
            return;
        }
        startTime = Date.now();
        console.log(`Starting trial ${trial + 1} for Task ${currentTask}`);
        if (currentTask === 1) {
            light1.src = 'light-off.png';
            light2.src = 'light-on.png';
            feedback.textContent = '';
            switchA.src = 'switch-off.png';
            switchB.src = 'switch-off.png';
            switchA.disabled = false;
            switchB.disabled = false;
            if (Math.random() < 0.1) {
                correctOption[1] = correctOption[1] === 'A' ? 'B' : 'A';
                rewardProb[1] = { A: correctOption[1] === 'A' ? 0.8 : 0.2, B: correctOption[1] === 'B' ? 0.8 : 0.2 };
            }
        } else if (currentTask === 2) {
            feedback2.textContent = '';
            hatA.disabled = false;
            hatB.disabled = false;
            if (Math.random() < 0.1) {
                correctOption[2] = correctOption[2] === 'A' ? 'B' : 'A';
                rewardProb[2] = { A: correctOption[2] === 'A' ? 0.8 : 0.2, B: correctOption[2] === 'B' ? 0.8 : 0.2 };
            }
            arrowHat = Math.random() < 0.8 ? correctOption[2] : (correctOption[2] === 'A' ? 'B' : 'A');
            hatA.src = arrowHat === 'A' ? 'arrow-hat.png' : 'no arrow-hat.png';
            hatB.src = arrowHat === 'B' ? 'arrow-hat.png' : 'no arrow-hat.png';
        } else if (currentTask === 3) {
            const showUpTo = 20 + trial;
            stockChartInstance.data.datasets[0].data = stockData.slice(0, showUpTo).concat(Array(30 - showUpTo).fill(null));
            stockChartInstance.update();
            feedback3.textContent = '';
            stockUp.disabled = false;
            stockDown.disabled = false;
        } else if (currentTask === 4) {
            const orbitCtx = document.getElementById('orbitCanvas').getContext('2d');
            if (orbitCtx) {
                drawOrbitScenario(orbitCtx, trial, 400, 200);
            } else {
                console.error('orbitCanvas context not available');
                feedback4.textContent = 'Error: Canvas not available';
            }
            feedback4.textContent = '';
            orbitA.disabled = false;
            orbitB.disabled = false;
            orbitC.disabled = false;
            const correctTrialIndex = trial < maxTrials[3] - 1 ? trial + 1 : 10;
            const availableIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            availableIndices.splice(availableIndices.indexOf(trial), 1);
            if (!availableIndices.includes(correctTrialIndex)) availableIndices.push(correctTrialIndex);
            for (let i = availableIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
            }
            selectedIndices = availableIndices.slice(0, 3);
            if (!selectedIndices.includes(correctTrialIndex)) {
                selectedIndices[2] = correctTrialIndex;
            }
            for (let i = selectedIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
            }
            const buttons = ['A', 'B', 'C'];
            const positionMap = { [buttons[0]]: selectedIndices[0], [buttons[1]]: selectedIndices[1], [buttons[2]]: selectedIndices[2] };
            orbitA.setAttribute('aria-label', `Orbital Position ${buttons[0]}`);
            orbitB.setAttribute('aria-label', `Orbital Position ${buttons[1]}`);
            orbitC.setAttribute('aria-label', `Orbital Position ${buttons[2]}`);
            const orbitACtx = document.getElementById('orbitA').getContext('2d');
            const orbitBCtx = document.getElementById('orbitB').getContext('2d');
            const orbitCCtx = document.getElementById('orbitC').getContext('2d');
            if (orbitACtx) drawOrbitScenario(orbitACtx, positionMap['A'], 100, 50);
            if (orbitBCtx) drawOrbitScenario(orbitBCtx, positionMap['B'], 100, 50);
            if (orbitCCtx) drawOrbitScenario(orbitCCtx, positionMap['C'], 100, 50);
        }
    }

    function processChoice(choice) {
        console.log(`Processing choice ${choice} for Task ${currentTask}, Trial ${trial + 1}`);
        if ((currentTask === 1 && (switchA.disabled || switchB.disabled)) ||
            (currentTask === 2 && (hatA.disabled || hatB.disabled)) ||
            (currentTask === 3 && (stockUp.disabled || stockDown.disabled)) ||
            (currentTask === 4 && (orbitA.disabled || orbitB.disabled || orbitC.disabled)) ||
            (currentTask === 5 && (document.getElementById('purpleA').disabled || document.getElementById('purpleB').disabled))) {
            console.log('Choice ignored: buttons disabled');
            return;
        }

        if (currentTask === 1) {
            switchA.disabled = true;
            switchB.disabled = true;
        } else if (currentTask === 2) {
            hatA.disabled = true;
            hatB.disabled = true;
        } else if (currentTask === 3) {
            stockUp.disabled = true;
            stockDown.disabled = true;
        } else if (currentTask === 4) {
            orbitA.disabled = true;
            orbitB.disabled = true;
            orbitC.disabled = true;
        } else if (currentTask === 5) {
            const purpleA = document.getElementById('purpleA');
            const purpleB = document.getElementById('purpleB');
            if (!purpleA || !purpleB) {
                console.error('purpleA or purpleB elements not found in processChoice');
                feedback5.textContent = 'Error: Choice elements not available';
                return;
            }
            purpleA.disabled = true;
            purpleB.disabled = true;
            purpleA.style.display = 'none';
            purpleB.style.display = 'none';
        }

        const rt = (Date.now() - startTime) / 1000;
        let reward = 0, isNoisy = false, volatility = currentTask <= 2 ? volatilitySchedule[trial] : 'none';
        let mu2 = 0, mu3 = 0, sa2_2 = 0, sa2_3 = 0;
        let taskFeatures = {};

        if (currentTask === 1) {
            switchA.src = choice === 'A' ? 'switch-on.png' : 'switch-off.png';
            switchB.src = choice === 'B' ? 'switch-on.png' : 'switch-off.png';
            isNoisy = Math.random() < hgf[1].noise;
            reward = isNoisy ? (Math.random() < 0.5 ? 1 : 0) : (Math.random() < rewardProb[1][choice] ? 1 : 0);
            if (reward) {
                light1.src = 'light-on.png';
                light2.src = 'light-on.png';
                lightSuccesses++;
                feedback.textContent = 'Both lights on!';
            } else {
                light1.src = 'light-off.png';
                light2.src = 'light-off.png';
                feedback.textContent = 'Lights off.';
            }
            lightSuccessCount.textContent = ((lightSuccesses / (trial + 1)) * 100).toFixed(2) + '%';
            taskFeatures = {
                switchAState: switchA.src.includes('switch-on.png') ? 'on' : 'off',
                switchBState: switchB.src.includes('switch-on.png') ? 'on' : 'off',
                light1State: light1.src.includes('light-on.png') ? 'on' : 'off',
                light2State: light2.src.includes('light-on.png') ? 'on' : 'off'
            };
        } else if (currentTask === 2) {
            isNoisy = Math.random() < hgf[2].noise;
            reward = isNoisy ? (Math.random() < 0.5 ? 1 : 0) : (Math.random() < rewardProb[2][choice] ? 1 : 0);
            if (reward) {
                if (choice === 'A') hatA.src = arrowHat === 'A' ? 'arrow-rabbit-found.png' : 'no arrow-rabbit.png';
                else hatB.src = arrowHat === 'B' ? 'arrow-rabbit-found.png' : 'no arrow-rabbit.png';
                rabbitSuccesses++;
                feedback2.textContent = 'Rabbit found!';
            } else {
                feedback2.textContent = 'No rabbit.';
            }
            rabbitSuccessCount.textContent = ((rabbitSuccesses / (trial + 1)) * 100).toFixed(2) + '%';
            taskFeatures = {
                hatAState: hatA.src.includes('arrow-hat.png') ? 'arrow' : 'no-arrow',
                hatBState: hatB.src.includes('arrow-hat.png') ? 'arrow' : 'no-arrow',
                rabbitFound: reward ? 'yes' : 'no'
            };
        } else if (currentTask === 3) {
            const correctChoice = stockSequence[trial];
            reward = choice === correctChoice ? 1 : 0;
            feedback3.textContent = reward ? 'Correct prediction!' : 'Incorrect prediction.';
            const showUpTo = 21 + trial;
            stockChartInstance.data.datasets[0].data = stockData.slice(0, showUpTo).concat(Array(30 - showUpTo).fill(null));
            stockChartInstance.data.datasets = stockChartInstance.data.datasets.filter(dataset => dataset.label !== 'Moving Average');
            stockChartInstance.update();
            taskFeatures = { price: stockData[showUpTo - 1], movingAverage: calculateMovingAverage(stockData)[showUpTo - 1] };
        } else if (currentTask === 4) {
            const correctTrialIndex = trial < maxTrials[3] - 1 ? trial + 1 : 10;
            const positionMap = { 'A': selectedIndices[0], 'B': selectedIndices[1], 'C': selectedIndices[2] };
            reward = positionMap[choice] === correctTrialIndex ? 1 : 0;
            feedback4.textContent = reward ? 'Correct prediction!' : 'Incorrect prediction.';
            taskFeatures = drawOrbitScenario(document.getElementById('orbitCanvas').getContext('2d'), trial, 400, 200);
        } else if (currentTask === 5) {
            reward = choice === springSequence[trial] ? 1 : 0;
            feedback5.textContent = reward ? 'Correct choice!' : 'Incorrect choice.';
            const params = springTrials[trial];
            taskFeatures = {
                redSpringAmp: parseFloat(params.red.springAmp),
                redDuration: parseFloat(params.red.duration),
                redAmp: parseFloat(params.red.amp),
                redSize: parseFloat(params.red.size),
                purpleASpringAmp: parseFloat(params.purpleA.springAmp),
                purpleADuration: parseFloat(params.purpleA.duration),
                purpleAAmp: parseFloat(params.purpleA.amp),
                purpleASize: parseFloat(params.purpleA.size),
                purpleBSpringAmp: parseFloat(params.purpleB.springAmp),
                purpleBDuration: parseFloat(params.purpleB.duration),
                purpleBAmp: parseFloat(params.purpleB.amp),
                purpleBSize: parseFloat(params.purpleB.size)
            };
        }

        const predMu2 = hgf[currentTask].mu2;
        const w2 = 1 / (1 + Math.exp(hgf[currentTask].kappa * hgf[currentTask].mu3));
        const predError = reward - sigmoid(predMu2);
        hgf[currentTask].mu2 = predMu2 + w2 * predError;
        hgf[currentTask].sa2_2 = hgf[currentTask].sa2_2 + w2 * (1 - w2) * predError * predError;
        const predMu3 = hgf[currentTask].mu3;
        hgf[currentTask].mu3 = predMu3 + hgf[currentTask].zeta * (predError * predError - Math.exp(predMu3));
        hgf[currentTask].sa2_3 = hgf[currentTask].sa2_3 + hgf[currentTask].zeta * (1 - hgf[currentTask].zeta);
        mu2 = hgf[currentTask].mu2;
        mu3 = hgf[currentTask].mu3;
        sa2_2 = hgf[currentTask].sa2_2;
        sa2_3 = hgf[currentTask].sa2_3;

        responses.push({
            task: currentTask,
            trial: trial + 1,
            choice,
            rt,
            reward,
            isNoisy,
            volatility,
            mu2,
            mu3,
            sa2_2,
            sa2_3,
            kappa: hgf[currentTask].kappa,
            zeta: hgf[currentTask].zeta,
            taskFeatures,
            timestamp: new Date().toISOString()
        });

        trial++;
        console.log(`Choice processed for Task ${currentTask}, Trial ${trial}, Choice: ${choice}, Reward: ${reward}`);
        setTimeout(() => {
            if (currentTask === 5) {
                startSpringTrial();
            } else {
                startTrial();
            }
        }, 1000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (switchA && switchB) {
            switchA.addEventListener('click', () => processChoice('A'));
            switchB.addEventListener('click', () => processChoice('B'));
        }
        hatA.addEventListener('click', () => processChoice('A'));
        hatB.addEventListener('click', () => processChoice('B'));
        stockUp.addEventListener('click', () => processChoice('Up'));
        stockDown.addEventListener('click', () => processChoice('Down'));
        orbitA.addEventListener('click', () => processChoice('A'));
        orbitB.addEventListener('click', () => processChoice('B'));
        orbitC.addEventListener('click', () => processChoice('C'));
    });

    function saveResponses() {
        const trialCounts = responses.reduce((acc, r) => {
            acc[r.task] = (acc[r.task] || 0) + 1;
            return acc;
        }, {});
        for (let task = 1; task <= 5; task++) {
            if (trialCounts[task] !== maxTrials[task - 1]) {
                console.warn(`Task ${task} has ${trialCounts[task] || 0} trials, expected ${maxTrials[task - 1]}`);
            }
        }

        responses.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        const data = {
            participantID: participantID,
            ageGroup: ageGroupSelect.value,
            educationLevel: educationLevelSelect.value,
            autismDiagnosis: autismDiagnosisSelect.value,
            autismFunction: autismFunctionSelect.value,
            responses
        };
        taskContainer.innerHTML = `
            <h2>All Tasks Complete!</h2>
            <p>Ball tasks complete!</p>
            <p>Please provide any feedback:</p>
            <textarea id="generalFeedback" placeholder="Enter feedback" aria-label="General Feedback"></textarea>
            <button id="submitFeedbackBtn">Submit Feedback</button>
        `;
        document.getElementById('submitFeedbackBtn').addEventListener('click', () => {
            const generalFeedback = document.getElementById('generalFeedback').value.trim();
            data.generalFeedback = generalFeedback;
            console.log('Submitting data:', JSON.stringify(data, null, 2));
            data.responses.forEach(response => {
                const payload = {
                    participantID: data.participantID,
                    ageGroup: data.ageGroup,
                    educationLevel: data.educationLevel,
                    autismDiagnosis: data.autismDiagnosis,
                    autismFunction: data.autismFunction,
                    generalFeedback: data.generalFeedback,
                    task: response.task,
                    trial: response.trial,
                    choice: response.choice,
                    rt: response.rt,
                    reward: response.reward,
                    isNoisy: response.isNoisy,
                    volatility: response.volatility,
                    mu2: response.mu2,
                    mu3: response.mu3,
                    sa2_2: response.sa2_2,
                    sa2_3: response.sa2_3,
                    kappa: response.kappa,
                    zeta: response.zeta,
                    taskFeatures: response.taskFeatures,
                    timestamp: response.timestamp
                };
                fetch('https://asd-task-backend-29d40e85ff87.herokuapp.com/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result.status === 'success' ? 'Data saved' : 'Error: ' + result.message);
                    taskContainer.innerHTML = `
                        <h2>All Tasks Complete!</h2>
                        <p>Thank you for participating! Your feedback has been submitted.</p>
                    `;
                })
                .catch(error => console.error('Fetch error:', error));
            });
        });
    }
})();
