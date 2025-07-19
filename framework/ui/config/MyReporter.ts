import { FullResult, Reporter, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';
import logger from '../../logger';

export default class MyReporter implements Reporter {
  onEnd(result: FullResult): void | Promise<void> {
    logger.warn(`Test run is finished: ` + `${result.status}`.toUpperCase());
  }

  onError(error: TestError): void {
    logger.error(error.message);
  }

  onStdErr(chunk: string | Buffer): void {
    logger.error(chunk);
  }

  onStdOut(chunk: string | Buffer): void {
    logger.error(chunk);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    logger.info(`Step: [worker ${result.workerIndex}] ${step?.title}`);
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (step?.error?.message !== undefined) {
      logger.error(`Step: [worker ${result.workerIndex}] ${step?.error}`);
    }
  }

  onTestBegin(test: TestCase): void {
    logger.warn(`Test is started: ${test?.title} ${test?.id}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info(`Test is ended: ${test?.title} ${test?.id}`);
    const status = `Test result is: ` + `${result?.status}`.toUpperCase();
    switch (result?.status) {
      case 'failed':
      case 'interrupted':
      case 'timedOut':
        logger.error(status);
        break;
      case 'skipped':
        logger.warn(status);
        break;
      default:
        logger.info(status);
        break;
    }
  }

  printsToStdio(): boolean {
    return true;
  }
}
